"use state";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface AppliedJob {
  name: string;
  experience: string;
  skills: string;
  role: string;
  salary: string;
  email: string | null;
  createId: string | null;
  profileId: string;
  applyId: string;
}

const GetListOfApplied = (createId: any) => {
  const [data, setData] = useState<AppliedJob[]>([]);

  const getAllApplied = async () => {
    const response = await axios.get(
      `http://localhost:8080/job_seeker/list/${createId?.createId}`
    );

    setData(response?.data);
  };
  useEffect(() => {
    getAllApplied();
  }, [createId]);

  return (
    <>
      <Box>
        <Typography variant="h3" fontSize={"16px"} fontWeight={500}>
          List of all applied candidates
        </Typography>
        <Box width="80%">
          {data?.map((item,index) => (
            <Box
              className="box"
              display="flex"
              flexWrap="wrap"
              rowGap="12px"
              columnGap="4%"
              key={index}
            >
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Job Id
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.createId}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Name
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.name}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Current role
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.role}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Skills
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.skills}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Experience in years
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.experience}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Desired salary
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.salary}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Email
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.email}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default GetListOfApplied;
