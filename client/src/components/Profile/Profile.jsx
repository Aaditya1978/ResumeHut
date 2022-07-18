import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Avatar,
  Grid,
  Skeleton,
  Stack,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import icon from "../../images/ResumeHut.png";
import minimalImage from "../../images/minimal.png";
import materialImage from "../../images/material.png";
import modernImage from "../../images/modern.png";
import "./Profile.scss";

export default function Profile({ user }) {
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState([false]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error2, setError2] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState("");

  useEffect(() => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/profile/resume_data`;
      axios
        .post(url, { userName: user.login })
        .then((res) => {
          setResumeData(res.data.template);
          const len = res.data.template.length;
          const loading = new Array(len).fill(false);
          setLoading(loading);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError(true);
            setErrorMessage("No resume data found");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const generateResume = (e, data, ind) => {
    e.preventDefault();
    const newLoading = [...loading];
    newLoading[ind] = true;
    setLoading(newLoading);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/profile/resume`,
        {
          data: data,
        },
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${user.name}.pdf`;
        const nloading = [...loading];
        nloading[ind] = false;
        setLoading(loading);
        link.click();
      })
      .catch((err) => {
        const nloading = [...loading];
        nloading[ind] = false;
        setLoading(loading);
        setError2(true);
        setErrorMessage2(err.response.data.error);
        setTimeout(() => {
          setError2(false);
          setErrorMessage2("");
        }, 3000);
      });
  };

  const handleDelete = (e, id, email) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/profile/delete/`, {
        id: id,
        userName: user.login,
      })
      .then((res) => {
        setResumeData(res.data.template);
        const len = res.data.template.length;
        const loading = new Array(len).fill(false);
        setLoading(loading);
      })
      .catch((err) => {
        setError2(true);
        setErrorMessage2(err.response.data.error);
        setTimeout(() => {
          setError2(false);
          setErrorMessage2("");
        }, 3000);
      });
  }


  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/gitauth/logout`, "_self");
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="profile">
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
              <AiOutlineUser className="nav-i" /> Home
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
      <Box
        className="main-s"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt={user.login}
          src={user.avatar_url}
          sx={{ width: 86, height: 86 }}
        />
        <br />
        <Typography variant="h4" component="div" className="main-text">
          Hello {user.name}
        </Typography>
        <br />
        <br />
      </Box>

      {/* Resume Section */}
      <Box className="resume-s">
        <Typography variant="p" component="div" className="resume-text">
          Below are your created resumes. Download them to view. You can also
          edit and delete them.
          <br />
          <br />
        </Typography>

        {error && (
          <Typography variant="p" component="div" className="resume-text">
            {errorMessage}
          </Typography>
        )}

        {resumeData ? (
          <Grid container spacing={2}>
            {resumeData.map((resume, ind) => (
              <>
                {resume.type === "minimal" && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="resume-c"
                    key={ind}
                  >
                    <Zoom>
                      <img src={minimalImage} alt="resumenow" width="150px" />
                    </Zoom>
                    <Typography variant="h6" component="div" className="text-r">
                      Minimal
                    </Typography>
                    <SpeedDial
                      ariaLabel="SpeedDial"
                      icon={<SpeedDialIcon />}
                      direction="right"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <SpeedDialAction
                        icon={<EditIcon />}
                        tooltipTitle={"Edit"}
                        onClick={(e) =>
                          navigate(`/minimal/${resume._id}`)
                        }
                      />
                      <SpeedDialAction
                        icon={<DeleteIcon />}
                        tooltipTitle={"Delete"}
                        onClick={(e) => handleDelete(e, resume._id, user.login)}
                      />
                    </SpeedDial>
                    {!loading[ind] ? (
                      <Button
                        variant="contained"
                        className="btn-r"
                        onClick={(e) => generateResume(e, resume.data, ind)}
                      >
                        Download Resume
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="outlined"
                          className="generate-b2"
                        >
                          Generating.....
                        </LoadingButton>
                      </Stack>
                    )}
                  </Grid>
                )}
                {resume.type === "material" && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="resume-c"
                    key={ind}
                  >
                    <Zoom>
                      <img
                        src={materialImage}
                        alt="resumenow"
                        width="140px"
                        height="195px"
                      />
                    </Zoom>
                    <Typography variant="h6" component="div" className="text-r">
                      Material
                    </Typography>
                    <SpeedDial
                      ariaLabel="SpeedDial"
                      icon={<SpeedDialIcon />}
                      direction="right"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <SpeedDialAction
                        icon={<EditIcon />}
                        tooltipTitle={"Edit"}
                        onClick={(e) =>
                          navigate(`/material/${resume._id}`)
                        }
                      />
                      <SpeedDialAction
                        icon={<DeleteIcon />}
                        tooltipTitle={"Delete"}
                        onClick={(e) => handleDelete(e, resume._id, user.login)}
                      />
                    </SpeedDial>
                    {!loading[ind] ? (
                      <Button
                        variant="contained"
                        className="btn-r"
                        onClick={(e) => generateResume(e, resume.data, ind)}
                      >
                        Download Resume
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="outlined"
                          className="generate-b2"
                        >
                          Generating.....
                        </LoadingButton>
                      </Stack>
                    )}
                  </Grid>
                )}
                {resume.type === "modern" && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="resume-c"
                    key={ind}
                  >
                    <Zoom>
                      <img src={modernImage} alt="resumenow" width="150px" />
                    </Zoom>
                    <Typography variant="h6" component="div" className="text-r">
                      Modern
                    </Typography>
                    <SpeedDial
                      ariaLabel="SpeedDial"
                      icon={<SpeedDialIcon />}
                      direction="right"
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <SpeedDialAction
                        icon={<EditIcon />}
                        tooltipTitle={"Edit"}
                        onClick={(e) =>
                          navigate(`/modern/${resume._id}`)
                        }
                      />
                      <SpeedDialAction
                        icon={<DeleteIcon />}
                        tooltipTitle={"Delete"}
                        onClick={(e) => handleDelete(e, resume._id, user.login)}
                      />
                    </SpeedDial>
                    {!loading[ind] ? (
                      <Button
                        variant="contained"
                        className="btn-r"
                        onClick={(e) => generateResume(e, resume.data, ind)}
                      >
                        Download Resume
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="outlined"
                          className="generate-b2"
                        >
                          Generating.....
                        </LoadingButton>
                      </Stack>
                    )}
                  </Grid>
                )}
              </>
            ))}
          </Grid>
        ) : (
          !error && (
          <Grid container spacing={2}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item} className="resume-c">
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={218}
                  sx={{ bgcolor: "grey.700" }}
                />
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{ bgcolor: "grey.700" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={20}
                  sx={{ bgcolor: "grey.700" }}
                />
              </Grid>
            ))}
          </Grid>
          )
        )}

        {error2 && (
          <Typography variant="h6" component="div" className="text-r">
            {errorMessage2}
          </Typography>
        )}
      </Box>
    </div>
  );
}
