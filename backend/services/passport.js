const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({ userId: profile.id})
    .then(existingUser => {
      if(existingUser) {
        // već postoji korisnik  
        done(null,)      
      } else {
        // korisnik ne postoji  treba ga kreirati
        new User({ userId: profile.id}).save()
      }
    })
}));