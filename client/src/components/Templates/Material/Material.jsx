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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import icon from "../../../images/ResumeHut.png";
import "./Material.scss";

export default function Material({ user }) {
  const navigate = useNavigate();

  const params = useParams();

  const [data, setData] = useState({
    type: "material",
    userName: user.login,
    fname: "",
    lname: "",
    links: [""],
    skills: [""],
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
        location:"",
        role: "",
        start: "",
        end: "",
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        link: "",
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
    window.open(`${process.env.REACT_APP_BASE_URL}/gitauth/logout`, "_self");
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
      .post(url, {data : data} , {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
        },
      })
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
                label="Enter First Name"
                variant="standard"
                value={data.fname}
                onChange={(e) => setData({ ...data, fname: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter Last Name"
                value={data.lname}
                onChange={(e) => setData({ ...data, lname: e.target.value })}
                variant="standard"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Contact Details
              </Typography>
            </Grid>
            {data.links.map((link, ind) => (
              <Grid item xs={12} key={ind}>
                <TextField
                  key={ind}
                  label="Enter Contact"
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...data.links];
                    newLinks[ind] = e.target.value;
                    setData({ ...data, links: newLinks });
                  }}
                  variant="standard"
                  required
                />
                <RiDeleteBin5Fill
                  className="delete-icon"
                  onClick={() => {
                    const newLinks = [...data.links];
                    newLinks.splice(ind, 1);
                    setData({ ...data, links: newLinks });
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newLinks = [...data.links];
                  newLinks.push("");
                  setData({ ...data, links: newLinks });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Skills
              </Typography>
            </Grid>
            {data.skills.map((skill, ind) => (
              <Grid item xs={12} key={ind}>
                <TextField
                  key={ind}
                  label="Enter skill"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[ind] = e.target.value;
                    setData({ ...data, skills: newSkills });
                  }}
                  variant="standard"
                  required
                />
                <RiDeleteBin5Fill
                  className="delete-icon"
                  onClick={() => {
                    const newSkills = [...data.skills];
                    newSkills.splice(ind, 1);
                    setData({ ...data, skills: newSkills });
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newSkills = [...data.skills];
                  newSkills.push("");
                  setData({ ...data, skills: newSkills });
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
                style={{ marginLeft: "10px", marginBottom: "30px", marginTop: "5px" }}
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
                style={{ marginLeft: "10px", marginBottom: "30px", marginTop: "5px" }}
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
                Project Details
              </Typography>
            </Grid>
            {data.projects.map((project, ind) => (
              <Grid
                container
                spacing={2}
                key={ind}
                style={{ marginLeft: "10px", marginBottom: "30px", marginTop: "5px" }}
              >
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    key={ind}
                    label="Enter Project Name"
                    value={project.name}
                    onChange={(e) => {
                      const newProject = [...data.projects];
                      newProject[ind].name = e.target.value;
                      setData({ ...data, projects: newProject });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="Enter project Link"
                    value={project.link}
                    onChange={(e) => {
                      const newProject = [...data.projects];
                      newProject[ind].link = e.target.value;
                      setData({ ...data, projects: newProject });
                    }}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextareaAutosize
                    minRows={3}
                    placeholder="Enter Description"
                    value={project.description}
                    onChange={(e) => {
                      const newProject = [...data.projects];
                      newProject[ind].description = e.target.value;
                      setData({ ...data, projects: newProject });
                    }}
                    required
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <RiDeleteBin5Fill
                    className="delete-icon"
                    onClick={() => {
                      const newProject = [...data.projects];
                      newProject.splice(ind, 1);
                      setData({ ...data, projects: newProject });
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <MdAddCircle
                className="p-icon"
                onClick={() => {
                  const newProject = [...data.projects];
                  newProject.push({
                    name: "",
                    link: "",
                    start: "",
                    end: "",
                    description: "",
                  });
                  setData({ ...data, projects: newProject });
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
