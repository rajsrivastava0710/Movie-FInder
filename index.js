const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const custoMware = require('./config/middleware');
const flash = require('connect-flash');
const env = require('./config/environment');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/assets')));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(cookieParser());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//session cookie 
//mongostore to store session cookie in db
app.use(session({
	name:'datamonk_user',
	secret: env.session_cookie_key,
	saveUninitialized:false,
	resave:false,
	cookie:{
		maxAge:1000*60*100
		// in milli seconds
	},
	store: new MongoStore(
	{
		// mongooseConnection: db,
		url: `mongodb://localhost/${env.db}`,
		autoRemove: 'disabled'
	},
	function(err){
		console.log(err || 'connect mongo setup done');
	})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// connect-flash used after session is used
app.use(flash());

app.use(custoMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,(err)=>{
	if(err){
		console.log(`Error in running server: ${err}`);
	}
	console.log(`Server listening on Port ${port}`);
});