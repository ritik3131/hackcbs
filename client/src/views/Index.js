import * as React from "react";
import { useContext, useEffect, useState } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";
import ExploreIcon from "@mui/icons-material/Explore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Header from "components/Headers/Header.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import axiosInstance from "../util/axiosInstance";
import { AuthContext } from "../context/auth";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Index = (props) => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/login/user`
      );
      if (!response.data.error) authCtx.login({ token: response.data.token });
      else if (authCtx.user) authCtx.logout();
    };
    getUser();
  }, [authCtx]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_HOST}/course`
        );
        setCourses(response.data.courses);
        setMyCourses(response.data.myCourses);
      } catch (e) {
        console.log(e);
      }
    };
    getAllCourses();
  }, []);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const toggleHandler = (index) => {
    if (index) setCourses(myCourses);
    else setCourses(courses);
  };
  const [renderEntireCard, setEntireCard] = useState(false);
  const [saveIndex, setSaveIndex] = useState(0);
  const [renderSection, setRenderSection] = useState(false);
  const [indexSection, setIndexSection] = useState(0);
  function generate(element) {
    return courses[saveIndex].sections.map((value, index) => (
      <ListItem
        onClick={() => {
          console.log(index);
          setIndexSection(index);
          setRenderSection(true);
        }}
        style={{
          cursor: "pointer",
        }}
        secondaryAction={
          <IconButton edge="end" aria-label="delete"></IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FolderCopyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={value.content} />
      </ListItem>
    ));
  }
  console.log(courses[saveIndex], "hue");
  return (
    <>
      <Header
        displayCards={!renderEntireCard}
        totalCourses={courses.length}
        createdCourses={myCourses.length}
        OnToggle={toggleHandler}
      />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {!renderEntireCard &&
            courses.map((course, index) => {
              return (
                <>
                  <Col className="mb-3 mb-xl-0" xl="8">
                    <Card style={{ marginBottom: "20px" }}>
                      <Card style={{ margin: "20px" }}>
                        <CardBody>
                          <CardTitle
                            style={{
                              fontSize: "30px",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            {course.content}
                          </CardTitle>
                          <CardImg
                            alt="..."
                            src={course.image}
                            top
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                          <CardText style={{ marginTop: "20px" }}>
                            {course.description}
                          </CardText>
                          <Row md="4" sm="2" xs="1">
                            <Col>
                              <Button
                                className="btn-icon btn-3"
                                color="primary"
                                type="button"
                                style={{ marginBottom: "5px" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSaveIndex(index);
                                  setEntireCard(true);
                                }}
                              >
                                <span className="btn-inner--icon">
                                  <ExploreIcon />
                                </span>
                                <span className="btn-inner--text">Explore</span>
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                className="btn-icon btn-3"
                                color="success"
                                type="button"
                                style={{ marginBottom: "5px" }}
                              >
                                <span className="btn-inner--icon">
                                  <ThumbUpIcon />
                                </span>
                                <span className="btn-inner--text">
                                  {" "}
                                  {course.upvotes.length} {"   "} Like
                                </span>
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                className="btn-icon btn-3"
                                color="danger"
                                type="button"
                                style={{ marginBottom: "5px" }}
                              >
                                <span className="btn-inner--icon">
                                  <ThumbDownIcon />
                                </span>
                                <span className="btn-inner--text">
                                  {" "}
                                  {course.downvotes.length} {"   "}Dislike
                                </span>
                              </Button>
                            </Col>
                          </Row>
                          <div className="App">
                            <Rating initialValue={4} readonly={true} />
                          </div>
                        </CardBody>
                      </Card>
                    </Card>
                  </Col>
                </>
              );
            })}
          {renderEntireCard && !renderSection && (
            <Col className="mb-3 mb-xl-0" xl="8">
              <Card style={{ marginBottom: "20px" }}>
                <Card style={{ margin: "20px" }}>
                  <CardBody>
                    <CardTitle
                      style={{
                        fontSize: "30px",
                        fontWeight: "600",
                        color: "black",
                      }}
                    >
                      {courses[saveIndex].content}
                    </CardTitle>
                    <CardImg
                      alt="..."
                      src={courses[saveIndex].image}
                      top
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                    <CardText style={{ marginTop: "20px" }}>
                      {courses[saveIndex].description}
                    </CardText>
                    <Row md="4" sm="2" xs="1">
                      <Col>
                        <Button
                          className="btn-icon btn-3"
                          color="primary"
                          type="button"
                          style={{ marginBottom: "5px" }}
                          onClick={(e) => {
                            e.preventDefault();
                            setSaveIndex(0);
                            setEntireCard(false);
                          }}
                        >
                          <span className="btn-inner--icon">
                            <ExploreIcon />
                          </span>
                          <span className="btn-inner--text">Go Back</span>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-icon btn-3"
                          color="success"
                          type="button"
                          style={{ marginBottom: "5px" }}
                        >
                          <span className="btn-inner--icon">
                            <ThumbUpIcon />
                          </span>
                          <span className="btn-inner--text">
                            {" "}
                            {courses[saveIndex].upvotes.length} {"   "} Like
                          </span>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="btn-icon btn-3"
                          color="danger"
                          type="button"
                          style={{ marginBottom: "5px" }}
                        >
                          <span className="btn-inner--icon">
                            <ThumbDownIcon />
                          </span>
                          <span className="btn-inner--text">
                            {" "}
                            {courses[saveIndex].downvotes.length} {"   "}Dislike
                          </span>
                        </Button>
                      </Col>
                    </Row>
                    <div className="App">
                      <Rating initialValue={4} readonly={true} />
                    </div>
                  </CardBody>
                </Card>
              </Card>
            </Col>
          )}
          {console.log(courses)}
          {renderEntireCard && (
            <Col xl="4">
              <Card style={{ marginBottom: "20px" }}>
                <Card style={{ margin: "20px" }}>
                  <CardBody>
                    <Grid item xs={12} md={6}>
                      <CardTitle
                        style={{
                          fontSize: "30px",
                          fontWeight: "600",
                          color: "black",
                        }}
                      >
                        Sections for course
                      </CardTitle>
                      <Demo>
                        <List dense={dense}>{generate()}</List>
                      </Demo>
                    </Grid>
                  </CardBody>
                </Card>
              </Card>
            </Col>
          )}
          {renderSection &&
            SectionCard(courses[saveIndex].sections[indexSection])}
        </Row>
      </Container>
    </>
  );
};
function CommentCard(course) {
  return (
    <Col className="mb-3 mb-xl-0" xl="12">
      <Card style={{ marginBottom: "20px" }}>
        <Card style={{ margin: "20px" }}>
          <CardBody>
            <CardTitle
              style={{
                fontSize: "30px",
                fontWeight: "600",
                color: "black",
              }}
            >
              {course.content}
            </CardTitle>
            <Row md="4" sm="2" xs="1">
              
              <Col>
                <Button
                  className="btn-icon btn-3"
                  color="success"
                  type="button"
                  style={{ marginBottom: "5px" }}
                >
                  <span className="btn-inner--icon">
                    <ThumbUpIcon />
                  </span>
                  <span className="btn-inner--text"> Like</span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn-icon btn-3"
                  color="danger"
                  type="button"
                  style={{ marginBottom: "5px" }}
                >
                  <span className="btn-inner--icon">
                    <ThumbDownIcon />
                  </span>
                  <span className="btn-inner--text"> Dislike</span>
                </Button>
              </Col>
            </Row>
          
          </CardBody>
        </Card>
        <div
          style={{
            margin: "20px",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Reply"
            variant="outlined"
            InputProps={{
              endAdornment: <Button>Reply</Button>,
            }}
          />
        </div>
      </Card>
    </Col>
  );
}
function SectionCard(course) {
  return (
    <>
      <Col className="mb-3 mb-xl-0" xl="8">
        <Card style={{ marginBottom: "20px" }}>
          <Card style={{ margin: "20px" }}>
            <CardBody>
              <CardTitle
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  color: "black",
                }}
              >
                {course.content}
              </CardTitle>
              <CardImg
                alt="..."
                src={course.image}
                top
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <CardText style={{ marginTop: "20px" }}>
                {course.description}
              </CardText>
              <Row md="4" sm="2" xs="1">
                <Col>
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    style={{ marginBottom: "5px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      // setSaveIndex(index);
                      // setEntireCard(true);
                    }}
                  >
                    <span className="btn-inner--icon">
                      <ExploreIcon />
                    </span>
                    <span className="btn-inner--text">Explore</span>
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="btn-icon btn-3"
                    color="success"
                    type="button"
                    style={{ marginBottom: "5px" }}
                  >
                    <span className="btn-inner--icon">
                      <ThumbUpIcon />
                    </span>
                    <span className="btn-inner--text">
                      {" "}
                      {course.upvotes.length} {"   "} Like
                    </span>
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="btn-icon btn-3"
                    color="danger"
                    type="button"
                    style={{ marginBottom: "5px" }}
                  >
                    <span className="btn-inner--icon">
                      <ThumbDownIcon />
                    </span>
                    <span className="btn-inner--text">
                      {" "}
                      {course.downvotes.length} {"   "}Dislike
                    </span>
                  </Button>
                </Col>
              </Row>
              <div className="App">
                <Rating initialValue={4} readonly={true} />
              </div>
            </CardBody>
          </Card>
          <div
            style={{
              margin: "20px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Ask Questions"
              variant="outlined"
              InputProps={{
                endAdornment: <Button>Submit</Button>,
              }}
            />
          </div>
        </Card>
        {CommentCard(course)}
      </Col>
     
    </>
  );
}

export default Index;
