"use client";
import React, { useEffect, useState } from "react";
import Mainpage from "../mainPage";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import JobCard from "./jobCard";

interface Job {
  company: string;
  experience: string;
  skills: string;
  jobRole: string;
  salary: string;
  description: string | null;
  email: string | null;
  createId: string | null;
}

const Post = () => {
  const [data, setData] = useState<Job[]>([]);
  const email = localStorage.getItem("email");
  const getData = async () => {
    const response = await axios.get(`http://localhost:8080/employer/${email}`);

    if (response.status === 200) {
      setData(response.data);
    }
  };
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box marginTop="16px">
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" fontWeight={500} fontSize={18}>
            {" "}
            Jobs u have posted
          </Typography>
        </Box>
        <Box width="90%">
          {data?.map((item, index) => <JobCard item={item} index={index} key={index}/>)}
        </Box>
      </Box>
    </>
  );
};

export default Post;
