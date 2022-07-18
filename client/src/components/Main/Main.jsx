import React, { useState } from "react";
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Grid,
  Stack,
} from "@mui/material";
import { BsGoogle, BsGithub } from "react-icons/bs";
import icon from "../../images/ResumeHut.png";
import "./Main.scss";

export default function Main() {
  const [isCreate, setIsCreate] = useState(true);

  const handleChange1 = () => {
    setIsCreate(true);
  };

  const handleChange2 = () => {
    setIsCreate(false);
  };

  const handleGoogleSignup = () => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}/gauth/google/callback`,
      "_self"
    );
  };

  const handleGithubSignup = () => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}/gitauth/github`,
      "_self"
    );
  }

  return (
    <div className="main">
      {/* Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <img src={icon} alt="resumenow" width="80px" />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              className="logo-text"
              sx={{ flexGrow: 1 }}
            >
              ResumeNow
            </Typography>
            <Button
              className={isCreate ? "nav-b selected" : "nav-b"}
              onClick={handleChange1}
              color="inherit"
            >
              Create Account
            </Button>
            <Button
              className={isCreate ? "nav-b" : "nav-b selected"}
              onClick={handleChange2}
              color="inherit"
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <br />
      <br />

      {/* Header */}
      <Box sx={{ flexGrow: 1 }}>
        <div className="header">
          {/* text section */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography className="header-text">
                Create beautiful resumes in minutes with our easy to use
                interface.
              </Typography>
              <Typography className="header-subtext">
                ResumeNow is a free resume builder that allows you to create a
                resume in minutes. You can create a resume for your job
                application, your resume for your portfolio, or your resume for
                your personal use.
              </Typography>
            </Grid>

            {/* signup section */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {isCreate && (
                <Grid item xs={12} sm={8} md={6}>
                  <Grid
                    container
                    spacing={2}
                    style={{
                      width: "500px",
                      border: "1px solid #ee2737",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography className="form-text">Sign Up with</Typography>
                    {/* <Grid item xs={12} className="form-c">
                      <Stack direction="row">
                        <Button
                          className="google-b"
                          variant="outlined"
                          startIcon={<BsGoogle />}
                          onClick={handleGithubSignup}
                        >
                          Google
                        </Button>
                      </Stack>
                    </Grid> */}
                    {/* <h5 className="line">
                      <span>OR Continue with</span>
                    </h5> */}
                    <Grid item xs={12} className="form-c">
                      <Stack direction="row">
                        <Button
                          className="github-b"
                          variant="outlined"
                          startIcon={<BsGithub />}
                          onClick={handleGithubSignup}
                        >
                          Github
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* login section */}
              {!isCreate && (
                <Grid item xs={12} sm={8} md={6}>
                  <Grid
                    container
                    spacing={2}
                    style={{
                      width: "500px",
                      border: "1px solid #ee2737",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography className="form-text">Log In with</Typography>
                    {/* <Grid item xs={12} className="form-c">
                      <Stack direction="row">
                        <Button
                          className="google-b"
                          variant="outlined"
                          startIcon={<BsGoogle />}
                          onClick={handleGithubSignup}
                        >
                          Google
                        </Button>
                      </Stack>
                    </Grid> */}
                    {/* <h5 className="line">
                      <span>OR continue with</span>
                    </h5> */}
                    <Grid item xs={12} className="form-c">
                      <Stack direction="row">
                        <Button
                          className="github-b"
                          variant="outlined"
                          startIcon={<BsGithub />}
                          onClick={handleGithubSignup}
                        >
                          Github
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </div>
          </Grid>
        </div>
      </Box>

      {/* Body Section */}
    </div>
  );
}
