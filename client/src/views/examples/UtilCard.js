import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import { ListItem, Stack, TextField, Grid } from "@mui/material";
import axiosInstance from "util/axiosInstance";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [sectionNo, setSectionNo] = useState(1);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitHandler = async () => {
    let formData = new FormData();
    formData.append("content", title);
    formData.append("description", description);
    formData.append("videoUrl", videoUrl);
    // formData.append("username", "Chris");
    formData.append("image", image);
    if (title.trim().length > 0)
      await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_HOST}/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    setTitle("");
    setDescription("");
    setImage(null);
    setSectionNo((prevState) => prevState + 1);
    setVideoUrl("");
  };

  return (
    <Card sx={{ maxWidth: "100%" }} style={{ margin: "0 20px" }}>
      <CardHeader
        title={`Section ${sectionNo}`}
        subheader={
          <TextField
            id="outlined-basic"
            label="Section Name"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        }
      />

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          //   aria-expanded={expanded}
          aria-label="show more"
        >
          {" "}
          <Button variant="contained" endIcon={<AddIcon />}>
            {" "}
            Add Description
          </Button>
          {/* <ExpandMoreIcon /> */}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ textAlign: "center" }}>
          <CardHeader title={`Description`}></CardHeader>
          <Grid container spacing={5}>
            <Grid item md={4} xs={12}>
              <TextField
                id="outlined-basic"
                label="Content"
                value={description}
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                id="outlined-basic"
                label="Video URL"
                value={videoUrl}
                variant="outlined"
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <Typography style={{ fontWeight: "900" }}>
                  Image Upload
                </Typography>
                <PhotoCamera />
              </IconButton>
            </Grid>
                <Button onClick={submitHandler}>Submit</Button>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
