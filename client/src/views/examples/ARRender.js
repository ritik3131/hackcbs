// react component that copies the given text inside your clipboard
// reactstrap components
import { Card, Container } from "reactstrap";
import Box from "@mui/material/Box";
// core components
import Header from "components/Headers/Header.js";
import ARWindow from "../../components/AR/ARWindow"
const Icons = () => {
  return (
    <>
      <Header displayCards={false} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Card className="bg-secondary shadow border-0">
          <Box
            component="form"
            style={{ margin: "50px", textAlign: "center" }}
            autoComplete="off"
          >
          <ARWindow  />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Icons;
