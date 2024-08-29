"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "../../post/card.css";
import Mainpage from "../../mainPage";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  company: Yup.string()
    .required("Company is required")
    .min(3, "please enter atleast 3 character length company name"),
  jobRole: Yup.string()
    .required("Job role is required")
    .min(2, "please enter job role"),
  skills: Yup.string()
    .required("Skill is required")
    .min(1, "please enter atleast 1 skill"),
  salary: Yup.string()
    .required("Salary is required")
    .min(3, "please enter atleast salary"),
  experience: Yup.string()
    .required("Experience is required")
    .min(1, "please enter atleast no of experience required"),
  description: Yup.string(),
});

const page = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState<Job>();
  const [edit, setedit] = useState(false);

  // Extract the id parameter from the URL
  const id = pathName.split("/")[pathName.split("/").length - 1];

  const getJobById = async () => {
    const response = await axios.get(
      `http://localhost:8080/employer/post/${id}`
    );
    if (response?.status === 200) setData(response?.data?.[0]);
  };
  useEffect(() => {
    getJobById();
  }, [id]);
  const initialValues = {
    company: data?.company || "",
    jobRole: data?.jobRole || "",
    skills: data?.skills,
    salary: data?.salary || "",
    experience: data?.experience || "",
    description: data?.description || "",
  };
  const datarender = [
    {
      label: "Company",
      value: data?.company,
    },
    {
      label: "Job role",
      value: data?.jobRole,
    },
    {
      label: "Skills",
      value: data?.skills,
    },
    {
      label: "Experience",
      value: data?.experience,
    },
    {
      label: "Salary",
      value: data?.salary,
    },
    {
      label: "Description",
      value: data?.description,
    },
  ];

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Mainpage />
      <Box
        display="flex"
        justifyContent="center"
        marginTop="24px"
        marginBottom="24px"
      >
        <Typography variant="h2" fontWeight={500} fontSize={24}>
          More about the job
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form>
            <Box
              className="box"
              display="flex"
              justifyContent="space-between"
              width="80%"
            >
              <Grid container rowGap={2} columnGap={2} width="90%">
                {datarender?.map((item) =>
                  !edit ? (
                    <Grid
                      item
                      md={item?.value === "experience" ? 5 : 3}
                      sm={3}
                      xs={5}
                    >
                      <Typography variant="h4" fontWeight={400} fontSize="12px">
                        {item?.label}
                      </Typography>
                      <Typography
                        variant="h2"
                        fontWeight={500}
                        fontSize={"16px"}
                      >
                        {item?.value}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      md={item?.value === "experience" ? 5 : 3}
                      sm={4}
                      xs={5}
                    >
                      <Field
                        as={TextField}
                        size="small"
                        name={item?.value!}
                        label={item?.label}
                        // value={values?.}
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                  )
                )}
              </Grid>
              <Box width="10%">
                {!edit ? (
                  <Button
                    variant="contained"
                    onClick={() => setedit((prev) => !prev)}
                    size="small"
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleSubmit(values)}
                    size="small"
                  >
                    Save
                  </Button>
                )}
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default page;
