"use client";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./card.css";
import ApplyForJob from "./applyForJob";

interface Job {
  company: string;
  experience: string;
  skills: string;
  jobRole: string;
  salary: string;
  description: string | null;
  email: string | null;
  createId: number;
}

const GetAllApplied = () => {
  const [allData, setAllData] = useState<Job[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [createId, setCreateId] = useState<any>();
  const getAllJobsPosted = async () => {
    const response = await axios.get(`http://localhost:8080/employer`);
    setAllData(response?.data);
  };
  useEffect(() => {
    getAllJobsPosted();
  }, []);
  const handleModal = () => {
    setModal((prev) => !prev);
  };
  const handleCreateId = (item: Job) => {
    setCreateId(item?.createId);
  };
  return (
    <>
      <Box marginTop="24px">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="8px"
        >
          <Typography>List of all jobs posted</Typography>
          <Typography variant="h6" fontSize={"12px"} fontWeight={400}>
            Create profile to apply
          </Typography>
        </Box>
        <Box>
          {allData?.map((item) => (
            <Box
              className="box"
              display="flex"
              flexWrap="wrap"
              rowGap="12px"
              columnGap="4%"
            >
              <Box width="10%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Job Id
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.createId}
                </Typography>
              </Box>
              <Box width="20%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Company name
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.company}
                </Typography>
              </Box>
              <Box width="20%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Job role
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.jobRole}
                </Typography>
              </Box>
              <Box width="30%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Skills required
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.skills}
                </Typography>
              </Box>
              <Box width="10%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Experience required
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.experience}
                </Typography>
              </Box>
              <Box width="20%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Salary
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.salary}
                </Typography>
              </Box>
              <Box width="20%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Email
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.email}
                </Typography>
              </Box>
              <Box width="50%">
                <Typography variant="h6" fontSize={12} fontWeight={400}>
                  Description
                </Typography>
                <Typography variant="h4" fontSize={16} fontWeight={500}>
                  {item?.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleModal();
                  handleCreateId(item);
                }}
              >
                Apply
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      {modal && (
        <ApplyForJob open={modal} onClose={handleModal} createId={createId} />
      )}
    </>
  );
};

export default GetAllApplied;
