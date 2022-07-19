require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
// const gpassportSetup = require("./utils/gpassport");
const gitpassportSetup = require("./utils/gitpassport");
// const gauthRoutes = require("./routes/gauth");
const gitauthRoutes = require("./routes/gitauth");
const resumeRoutes = require("./routes/resume");
const profileRoutes = require("./routes/profile");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser')

const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASSWORD;
const dbUrl = `mongodb+srv://${mongo_user}:${mongo_pass}@resumehut.ckjo8.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.enable("trust proxy", 1);
app.use(express.json());
// app.use(
//     cookieSession({
//         name: "session",
//         keys: [process.env.COOKIE_KEY]
//     })
// );
app.use(cookieParser());
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  cookie: {
    secure: true,
    maxAge: 3600000,
    sameSite:'none',
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "https://resumehut.netlify.app",
    credentials: true,
}));

const PORT = process.env.PORT || 5000;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// app.use("/gauth", gauthRoutes);
app.use("/gitauth", gitauthRoutes);
app.use("/generate", resumeRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});


// http://localhost:3000
// http://localhost:5000/gitauth/github/callback