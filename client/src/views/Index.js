import { useContext, useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  CardHeader,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import ExploreIcon from "@mui/icons-material/Explore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Header from "components/Headers/Header.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import axiosInstance from "../util/axiosInstance";
import { AuthContext } from "../context/auth";
const Index = (props) => {
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
  const toggleHandler =(index)=>{
    if(index) setCourses(myCourses);
    else setCourses(courses)
  }
  return (
    <>
      <Header displayCards={true} totalCourses = {courses.length} createdCourses={myCourses.length} OnToggle={toggleHandler}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {courses.map((course) => {
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
                      {/* <Col>
                       <Button
                         className="btn-icon btn-3"
                         color="dark"
                         type="button"
                         style={{ marginBottom: "5px" }}
                       >
                         <span className="btn-inner--icon">
                           <BlockIcon />
                         </span>
                         <span className="btn-inner--text">BlackList</span>
                       </Button>
                     </Col> */}
                    </Row>
                    <div className="App">
                      {/* set initial value */}
                      <Rating initialValue={4} readonly={true} />
                    </div>
                  </CardBody>
                </Card>
              </Card>
            </Col>;
          })}
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
