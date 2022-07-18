const router = require("express").Router();
const passport = require("passport");


router.get("/login/success", (req, res) => {
    // console.log(req);
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


router.get("/github", passport.authenticate("github", { scope: [ 'user:email' ] }));

router.get("/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;