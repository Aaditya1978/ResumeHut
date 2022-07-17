import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Grid,
  TextField,
  TextareaAutosize,
  Stack,
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import icon from "../../../images/ResumeHut.png";
import "./Modern.scss";

export default function Modern({ user }) {
  const navigate = useNavigate();

  const params = useParams();

  const CustomSlider = styled(Slider)({
    color: "#ee2737",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#ee2737",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const [data, setData] = useState({
    type: "modern",
    user: user.email,
    name: "",
    address: "",
    mail: "",
    phone: "",
    skills: [
      {
        skill: "",
        percent: 70,
      },
    ],
    education: [
      {
        degree: "",
        college: "",
        location: "",
        start: "",
        end: "",
        grade: "",
      },
    ],
    experience: [
      {
        company: "",
        location: "",
        role: "",
        start: "",
        end: "",
        description: "",
      },
    ],
    interests: [""],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (params.id) {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/profile/resume_id`;
        axios
          .post(url, { id: params.id })
          .then((res) => {
            setData(res.data);
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
    }
  }, [params.id]);

  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/gauth/logout`, "_self");
  };

  const handleNavigate = () => {
    navigate("/profile");
  };

  const handleGenerate = (e) => {
    let url = "";
    if(params.id) {
      url = `${process.env.REACT_APP_BASE_URL}/profile/update/${params.id}`;
    }else{
      url = `${process.env.REACT_APP_BASE_URL}/generate/resume`;
    }
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        url,
        { data: data },
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
        setLoading(false);
        link.click();
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 3000);
      });
  };

  return (
    <div className="minimal">
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

      {/* back button */}
      <Grid container spacing={3} className="home-btn">
        <Grid item xs={12}>
          <Button variant="contained" className="btn">
            <Link to="/home">Go Back</Link>
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />

      {/* form section */}
      <Container>
        <Box
          component="form"
          noValidate
          className="form-s"
          onSubmit={handleGenerate}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Basic Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter Name"
                variant="standard"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Contact Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter Address"
                value={data.address}
                onChange={(e) => {
                  setData({ ...data, address: e.target.value });
                }}
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter Mail"
                value={data.mail}
                onChange={(e) => {
                  setData({ ...data, mail: e.target.value });
                }}
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter Phone Number"
                value={data.phone}
                onChange={(e) => {
                  setData({ ...data, phone: e.target.value });
                }}
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Skills
              </Typography>
            </Grid>
            {data.skills.map((skill, ind) => (
              <Grid
                container
                spacing={2}
                key={ind}
                style={{
                  marginLeft: "10px",
                  marginBottom: "30px",
                  marginTop: "5px",
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    label="Enter skill"
                    value={skill.skill}
                    onChange={(e) => {
                      const newSkill = [...data.skills];
                      newSkill[ind].skill = e.target.value;
                      setData({ ...data, skills: newSkill });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography id="input-slider" gutterBottom>
                    Enter skill level
                  </Typography>
                  <Box sx={{ width: 300 }}>
                    <CustomSlider
                      value={skill.percent}
                      onChange={(e) => {
                        const newSkill = [...data.skills];
                        newSkill[ind].percent = e.target.value;
                        setData({ ...data, skills: newSkill });
                      }}
                      step={10}
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                      aria-label="slider"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <RiDeleteBin5Fill
                    className="delete-icon"
                    onClick={() => {
                      const newSkills = [...data.skills];
                      newSkills.splice(ind, 1);
                      setData({ ...data, skills: newSkills });
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  setData({
                    ...data,
                    skills: [...data.skills, { skill: "", percent: 70 }],
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Education Details
              </Typography>
            </Grid>
            {data.education.map((edu, ind) => (
              <Grid
                container
                spacing={2}
                key={ind}
                style={{
                  marginLeft: "10px",
                  marginBottom: "30px",
                  marginTop: "5px",
                }}
              >
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    key={ind}
                    label="Enter Degree Name"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].degree = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Institute Location"
                    value={edu.location}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].location = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Institute Name"
                    value={edu.college}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].college = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Year of Start"
                    value={edu.start}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].start = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Year of End"
                    value={edu.end}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].end = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter grade"
                    value={edu.grade}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[ind].grade = e.target.value;
                      setData({ ...data, education: newEducation });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <RiDeleteBin5Fill
                    className="delete-icon"
                    onClick={() => {
                      const newEducation = [...data.education];
                      newEducation.splice(ind, 1);
                      setData({ ...data, education: newEducation });
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newEducation = [...data.education];
                  newEducation.push({
                    degree: "",
                    college: "",
                    start: "",
                    end: "",
                    grade: "",
                  });
                  setData({ ...data, education: newEducation });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Experience Details
              </Typography>
            </Grid>
            {data.experience.map((exp, ind) => (
              <Grid
                container
                spacing={2}
                key={ind}
                style={{
                  marginLeft: "10px",
                  marginBottom: "30px",
                  marginTop: "5px",
                }}
              >
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    key={ind}
                    label="Enter Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].company = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    key={ind}
                    label="Enter Company Location"
                    value={exp.location}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].location = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Position"
                    value={exp.role}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].role = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Year of Start"
                    value={exp.start}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].start = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter Year of End"
                    value={exp.end}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].end = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextareaAutosize
                    minRows={3}
                    placeholder="Enter Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[ind].description = e.target.value;
                      setData({ ...data, experience: newExperience });
                    }}
                    required
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <RiDeleteBin5Fill
                    className="delete-icon"
                    onClick={() => {
                      const newExperience = [...data.experience];
                      newExperience.splice(ind, 1);
                      setData({ ...data, experience: newExperience });
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newExperience = [...data.experience];
                  newExperience.push({
                    company: "",
                    role: "",
                    start: "",
                    end: "",
                    grade: "",
                  });
                  setData({ ...data, experience: newExperience });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Interests
              </Typography>
            </Grid>
            {data.interests.map((interest, ind) => (
              <Grid item xs={12} key={ind}>
                <TextField
                  key={ind}
                  label="Enter Interest"
                  value={interest}
                  onChange={(e) => {
                    const newInterest = [...data.interests];
                    newInterest[ind] = e.target.value;
                    setData({ ...data, interests: newInterest });
                  }}
                  variant="standard"
                  required
                />
                <RiDeleteBin5Fill
                  className="delete-icon"
                  onClick={() => {
                    const newInterest = [...data.interests];
                    newInterest.splice(ind, 1);
                    setData({ ...data, interests: newInterest });
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newInterest = [...data.interests];
                  newInterest.push("");
                  setData({ ...data, interests: newInterest });
                }}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {!loading ? (
              <>
                {params.id ? (
                  <button type="submit" className="generate-b">
                    Update Resume
                  </button>
                ) : (
                  <button type="submit" className="generate-b">
                    Generate Resume
                  </button>
                )}
              </>
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
          <Grid item xs={12}>
            {error && (
              <Typography variant="h5" component="h5">
                {errorMessage}
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
