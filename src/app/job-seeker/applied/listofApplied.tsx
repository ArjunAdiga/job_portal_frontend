"use client";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface type {
  createId: number;
}

const ListofApplied = () => {
  const profileId = localStorage.getItem("profileId");
  const [allData, setAllgetData] = useState<type[]>([]);
  const getAllApplied = async () => {
    const response = await axios.get(
      `http://localhost:8080/job_seeker/applied/${profileId}`
    );
    if (response.status === 200) {
      setAllgetData(response.data);
    }
  };
  useEffect(() => {
    getAllApplied();
  }, [profileId]);
  return (
    <>
      <Box marginTop="24px">
        <Typography variant="h3" fontWeight={500} fontSize="18px">
          List of all applied jobs
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap="24px"
          marginTop={"24px"}
        >
          {allData?.map((item,index) => (
            <Box display={"flex"} flexDirection={"column"} gap="8px" key={index}>
              <Typography variant="h5" fontWeight={400} fontSize="16px">
                This is job id
              </Typography>
              <Typography variant="h3" fontWeight={500} fontSize="20px">
                {item?.createId}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListofApplied;
