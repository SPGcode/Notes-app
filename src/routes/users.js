const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');

//routes
router.get('/users/signin', (req, res) =>{
    res.render('users/signin');
});

//authentication Local strategy model
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) =>{//No matters beacose againts the routes is the same, the method not
    const {name, email, password, confirm_password} = req.body;
    const errors = [];

    if(password != confirm_password){
        errors.push({text: 'Password does´nt match'});
    }
    if(password.length < 6){
        errors.push({text: 'Password need at least 6 characters'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else{
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
          req.flash('error_msg', 'This mail is already exist')
      }
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You´re registered successfully');
      res.redirect('/users/signin');
    };
});

router.get('/users/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});

module.exports = router;