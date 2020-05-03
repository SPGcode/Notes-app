//login validation
const passport = require('passport');
const localStrategy =  require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'//User for login
}, async (email, password, done)=>{
        const user = await User.findOne({email: email});
       
            if(!user){
                return done(null, false, { message: 'Not user found'})
            } else{
                const match = await user.matchPassword(password);
                    if(match){
                        return done(null, user);
                    } else{
                        return done(null, false, { message: 'Incorrect password'});
                    }
            }
}));

//to stock user in a session
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser( async (id, done) =>{
    await User.findById(id, (err,user) => {
        done(err, user);
    });
});