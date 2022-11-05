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
const Icons = () => {
  const [buttonEnabled, setButtonEnabled] = useState(true);
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
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Description"
                  defaultValue=""
                  style={{ width: "100%" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Thumbnail
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  disabled={buttonEnabled}
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
            <Button variant="contained" endIcon={<AddIcon />}>Add More Section</Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Icons;
