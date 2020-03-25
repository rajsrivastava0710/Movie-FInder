const express = require('express');

const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/user_controller');

console.log('User router loaded');

router.get('/signup',userController.signup);

router.get('/login',userController.login);

router.post('/create-user',userController.createUser);

router.post('/create-session', 
	passport.authenticate('local',{failureRedirect:'/user/login'})
	,userController.createSession);

router.get('/remove-session',userController.removeSession)

module.exports = router;