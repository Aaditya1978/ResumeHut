const router = require("express").Router();
const passport = require("passport");

router.get("/github", passport.authenticate("github", ["profile", "email"]));

router.get("/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

router.get("/login/success", (req, res) => {
    if(req.user){
        console.log(req.user);
        res.status(200).json({message: "Login success", user: req.user});
    }
    else{
        res.status(403).json({message: "Not Authorized"});
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({message:"Login failed"});
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;