const GithubStrategy = require('passport-github').Strategy;
const passport = require('passport');

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/gitauth/github/callback",
    scope: ["profile", "email"],
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});