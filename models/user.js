const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	favorites:[
	{
		type:String
	}
	]
},{
	// time for created at and updated at 
	timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;

