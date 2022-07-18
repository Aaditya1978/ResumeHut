const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const User = require("../models/user.model");

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/gitauth/github/callback",
    proxy: true
    },
    async function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        const id = profile.id;
        const name = profile.displayName;
        const userName = profile.username;
        const image = profile._json.avatar_url;
        const user = await User.findOne({userName: userName});
        if(!user) {
            const newUser = new User({
                id: id,
                name: name,
                userName: userName,
                image: image
            });
            await newUser.save();
        }
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findOne({userName: user.username}, function(err, user) {
        return done(err, user, function() {
            console.log("deserializeUser" + err);
        });
    });
});