/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState } from "react";
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
const Index = (props) => {
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
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
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
                    Project
                  </CardTitle>
                  <CardImg
                    alt="..."
                    src={
                      "https://img.freepik.com/free-vector/realistic-set-colorful-powder-clouds-explosions-isolated-transparent-background_1441-2628.jpg?w=996&t=st=1667665593~exp=1667666193~hmac=02f3920b23b1678f98ea9c68b74e8e42c089329854fcf00def4b674ecdf64779"
                    }
                    top
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <CardText style={{ marginTop: "20px" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
                        <span className="btn-inner--text">Like</span>
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
                        <span className="btn-inner--text">Dislike</span>
                      </Button>
                    </Col>
                    <Col>
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
                    </Col>
                  </Row>
                  <div className="App">
                    {/* set initial value */}
                    <Rating initialValue={4} readonly={true} />
                  </div>
                </CardBody>
              </Card>
            </Card>
          </Col>
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
