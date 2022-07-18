import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Grid,
} from "@mui/material";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import icon from "../../images/ResumeHut.png";
import headerImage from "../../images/Header.png";
import minimalImage from "../../images/minimal.png";
import materialImage from "../../images/material.png";
import modernImage from "../../images/modern.png";
import "./Home.scss";

export default function Home({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/gitauth/logout`, "_self");
  };

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <div className="home">
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
            <Button className="nav-b" color="inherit" onClick={handleNavigate}>
              <AiOutlineUser className="nav-i" /> Profile
            </Button>
            <Button className="nav-b" onClick={handleLogout} color="inherit">
              <AiOutlineLogout className="nav-i" /> Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />

      {/* main section */}
      <Box sx={{ flexGrow: 1 }} className="main-s">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h4" component="div" className="main-text">
              Welcome {user.name}
            </Typography>
            <br />
            <Typography variant="h6" component="div" className="sub-text">
              Select Resume template from the below list to create your resume.{" "}
              <br /> OR <br />
              Go to <Link to="/profile">Profile</Link> to view your created
              resumes.
              <br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img src={headerImage} alt="resumenow" width="450px" />
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />

      {/* resume section */}
      <Box className="resume-s">
        <Typography variant="h4" component="div" className="resume-text">
          Resume Templates
        </Typography>
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} className="resume-c">
            <Zoom>
              <img src={minimalImage} alt="resumenow" width="150px" />
            </Zoom>
            <Typography variant="h6" component="div" className="text-r">
              Minimal
            </Typography>
            <Button variant="contained" className="btn-r">
              <Link to="/minimal">Create Resume</Link>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="resume-c">
            <Zoom>
              <img src={materialImage} alt="resumenow" width="130px" />
            </Zoom>
            <Typography variant="h6" component="div" className="text-r">
              Material
            </Typography>
            <Button variant="contained" className="btn-r">
              <Link to="/material">Create Resume</Link>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="resume-c">
            <Zoom>
              <img src={modernImage} alt="resumenow" width="150px" />
            </Zoom>
            <Typography variant="h6" component="div" className="text-r">
              Modern
            </Typography>
            <Button variant="contained" className="btn-r">
              <Link to="/modern">Create Resume</Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
