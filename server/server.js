require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const gpassportSetup = require("./utils/gpassport");
const gitpassportSetup = require("./utils/gitpassport");
const gauthRoutes = require("./routes/gauth");
const gitauthRoutes = require("./routes/gitauth");
const resumeRoutes = require("./routes/resume");
const profileRoutes = require("./routes/profile");

const app = express();
app.use(express.json());
app.use(
    cookieSession({
        name: "session",
        keys: [process.env.COOKIE_KEY],
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const PORT = process.env.PORT || 5000;
const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASSWORD;

const dbUrl = `mongodb+srv://${mongo_user}:${mongo_pass}@resumehut.ckjo8.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

app.use("/gauth", gauthRoutes);
app.use("/gitauth", gitauthRoutes);
app.use("/generate", resumeRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
