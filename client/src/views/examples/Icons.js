import { useState } from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import { Card, Container } from "reactstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import UtilCard from "./UtilCard";
// core components
import Header from "components/Headers/Header.js";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axiosInstance from "util/axiosInstance";
const Icons = () => {
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const changeValuesHandler = (e) => {
    setContent(e.target.value);
  };
  const imageChangeHandler = (e) => {
    setImageUrl(e.target.files[0]);
  };
  const submitPostHandler = async () => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("description", description);
    // formData.append("username", "Chris");
    formData.append("image", imageUrl);
    if (content.trim().length > 0)
      await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_HOST}/course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    setContent("");
    setDescription("");
    // setImageUrl(null);
    // reload();
  };
  return (
    <>
      <Header displayCards={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Card className="bg-secondary shadow border-0">
          <Box
            component="form"
            style={{ margin: "50px" }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  defaultValue=""
                  style={{ width: "100%" }}
                  fullWidth
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Description"
                  defaultValue=""
                  style={{ width: "100%" }}
                  value={description}
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Thumbnail
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                    hidden
                      name="image"
                      accept="image/*"
                      type="file"
                      onChange={imageChangeHandler}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  disabled={
                    content.trim().length === 0 ||
                    description.trim().length === 0
                  }
                  onClick={submitPostHandler}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>

          <UtilCard />
          <Box
            component="form"
            style={{ margin: "50px", textAlign: "center" }}
            autoComplete="off"
          >
            <Button variant="contained" endIcon={<AddIcon />}>
              Add More Section
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Icons;
