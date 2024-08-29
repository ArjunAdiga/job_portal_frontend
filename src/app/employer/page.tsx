import { Box, Typography } from "@mui/material";
import React from "react";
import Mainpage from "./mainPage";

const page = () => {
  return (
    <div>
      {/* <Typography variant="h1" fontSize="26px" fontWeight="600">
        welcome , employer
      </Typography> */}
      <Box>
        <Mainpage />
      </Box>
    </div>
  );
};

export default page;
