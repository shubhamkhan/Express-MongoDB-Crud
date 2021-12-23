//user model
const User= require('../model/user_model');
//Bcrypt
const bcrypt= require('bcrypt');


// Passport login 
const LocalStrategy= require('passport-local').Strategy;

exports.login= function(passport){
  passport.use(new LocalStrategy( 
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username !!!' });
        }
        /* if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password !!!' });
        } return done(null, user);
        */
        else{
          bcrypt.compare(password, user.password).then(function(result) {
              if(result){
                  return done(null, user);
              }else{
                  return done(null, false, { message: 'Incorrect password !!!' });
              }
          });
        } 
      });
    }
  ));

  passport.serializeUser(function(user, done) {
      done(null, user._id);
  });
    
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}