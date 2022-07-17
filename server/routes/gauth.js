const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json({message: "Login success", user: req.user});
    }
    else{
        res.status(403).json({message: "Not Authorized"});
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({message:"Login failed"});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;