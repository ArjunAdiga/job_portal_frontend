"use client";
import React, { useState } from "react";
import Mainpage from "../mainPage";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import axios from "axios";

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

const initialValues = {
  company: "",
  jobRole: "",
  skills: "",
  salary: "",
  experience: "",
  description: "",
};
const Create = () => {
  const email = localStorage.getItem("email");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string;
    show: boolean;
  }>({ type: "success", message: "", show: false });
  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/employer/create",
        { ...values, email: email }
      );
      if (response.status === 201) {
        setAlert({
          type: "success",
          message: "Post creation was successful",
          show: true,
        });
        resetForm();
        setTimeout(() => {
          setAlert((prev) => ({ ...prev, show: false }));
        }, 3000);
        setLoading(false);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Creating post was unsuccessful",
        show: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);
      setLoading(false);
    }
  };
  return (
    <>
      <Mainpage />

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) =>
          handleSubmit(values, formikHelpers)
        }
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Box marginTop="16px" padding="32px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="h3" fontWeight="500" fontSize="18px">
                  Create job role
                </Typography>
                <Button type="submit" variant="contained" disabled={loading}>
                  Create{" "}
                  {loading && (
                    <CircularProgress
                      color="inherit"
                      size={12}
                      sx={{ marginLeft: "8px" }}
                    />
                  )}
                </Button>
              </Box>
              <Box marginTop="24px">
                <Grid container rowGap="12px" columnGap="12px">
                  <Grid item md={5} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="company"
                      label="Company"
                      fullWidth
                      error={touched.company && Boolean(errors.company)}
                      helperText={touched.company && errors.company}
                      values={values?.company}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="jobRole"
                      label="Job role"
                      fullWidth
                      error={touched.jobRole && Boolean(errors.jobRole)}
                      helperText={touched.jobRole && errors.jobRole}
                      values={values?.jobRole}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={5} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="skills"
                      label="Skills"
                      fullWidth
                      error={touched.skills && Boolean(errors.skills)}
                      helperText={touched.skills && errors.skills}
                      values={values?.skills}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={3} xs={5}>
                    <Field
                      as={TextField}
                      size="small"
                      name="salary"
                      label="CTC"
                      fullWidth
                      error={touched.salary && Boolean(errors.salary)}
                      helperText={touched.salary && errors.salary}
                      values={values?.salary}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={3} xs={5}>
                    <Field
                      as={TextField}
                      size="small"
                      name="experience"
                      label="Experience in years"
                      fullWidth
                      error={touched.experience && Boolean(errors.experience)}
                      helperText={touched.experience && errors.experience}
                      values={values?.experience}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={11} sm={11} xs={11}>
                    <Field
                      as={TextField}
                      size="small"
                      name="description"
                      label="Job description"
                      fullWidth
                      multiline
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      values={values?.description}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      {alert.show && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1300, // Ensures the alert is on top of other content
          }}
        >
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        </Box>
      )}
    </>
  );
};

export default Create;
