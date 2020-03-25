const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`,{useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true, useFindAndModify:false});

const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running
db.once('open', function() {
  console.log("Successfully connected to the database",env.db);
});