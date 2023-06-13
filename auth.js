const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '137306043548-in6ig8nj46onogf7vr3pvt254ov4kkd3.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET= '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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser((user, done)=>{
    done(null, user);
})

passport.deserializeUser((user, done)=>{
    done(null, user);
})