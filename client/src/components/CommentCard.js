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
function CommentCard({ replies }) {
  return (
    <>
      {" "}
      {replies.length > 0 &&
        replies.map((replie) => {
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
                      {replie.content}
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
        })}
      {replies.length == 0 && <h1>No Question</h1>}
    </>
  );
}

export default CommentCard;
