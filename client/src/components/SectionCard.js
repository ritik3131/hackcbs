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
import CommentCard from "./CommentCard";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function SectionCard({ course }) {
  const [questionContent, setQuestionContent] = useState("");
  const [replies, setReplies] = useState("");
  useEffect(() => {
    const getOnePost = async () => {
    const postId = course._id;
    const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/post/currentPost/${postId}`
      );
      const { post, replies } = response.data;
      setReplies(replies);
    };
    getOnePost();
  }, [replies]);
  const submitQuestionsHandler = async (e) => {
    e.preventDefault();
    const postId = course._id;
    if (questionContent.trim().length > 0)
      await axiosInstance.post(`${process.env.REACT_APP_BACKEND_HOST}/reply`, {
        content: questionContent,
        postId,
      });
    setQuestionContent("");
  };



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
              onChange={(e) => setQuestionContent(e.target.value)}
              value={questionContent}
              InputProps={{
                endAdornment: (
                  <Button onClick={submitQuestionsHandler}>Submit</Button>
                ),
              }}
            />
          </div>
        </Card>
        {<CommentCard replies ={replies}/>}
      </Col>
    </>
  );
}
export default SectionCard;
