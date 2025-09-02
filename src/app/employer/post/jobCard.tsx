import React from "react";
import "./card.css";
import { Box, Button, Grid, Typography } from "@mui/material";

import { useRouter } from "next/navigation";

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

const JobCard = ({ item, index }: { item: Job; index: number }) => {
  const datarender = [
    {
      label: "Company",
      value: item?.company,
    },
    {
      label: "Job role",
      value: item?.jobRole,
    },
    {
      label: "Skills",
      value: item?.skills,
    },
    {
      label: "Experience",
      value: item?.experience,
    },
    {
      label: "Salary",
      value: item?.salary,
    },
    {
      label: "Description",
      value: item?.description,
    },
  ];
  const router = useRouter();

  const handlePostbyId = (id: string) => {
    router.push(`/employer/post/${id}`);
  };
  return (
    <>
      <Box className="box">
        <Grid container rowGap={2} columnGap={2}>
          {datarender?.map((item,index) => (
            <Grid item md={3} sm={4} xs={5} key={index}>
              <Typography variant="h4" fontWeight={400} fontSize="12px">
                {item?.label}
              </Typography>
              <Typography variant="h2" fontWeight={500} fontSize={"16px"}>
                {item?.value}
              </Typography>
            </Grid>
          ))}
          <Box display="flex" justifyContent="end" alignItems="start">
            <Button
              variant="contained"
              onClick={() => handlePostbyId(item?.createId!)}
            >
              View
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default JobCard;
