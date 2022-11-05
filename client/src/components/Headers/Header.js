import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

const Header = ({ createdCourses, totalCourses, Ontoggle ,displayCards }) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              {displayCards && (
                <>
                  {" "}
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              All Courses
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {totalCourses}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>

                        <Button
                          color="primary"
                          type="button"
                          style={{ marginTop: "10px" }}
                          onClick={(e) => Ontoggle(0)}
                        >
                          SHOW
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              My created courses
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {createdCourses}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>

                        <Button
                          color="primary"
                          type="button"
                          style={{ marginTop: "10px" }}
                          onClick={(e) => Ontoggle(1)}
                        >
                          SHOW
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
