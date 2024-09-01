"use client";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";

const validationschema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "please enter atleast  character length  name"),
  role: Yup.string()
    .required("Role is required")
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
});

const initialValues = {
  name: "",
  role: "",
  skills: "",
  salary: "",
  experience: "",
};

const CreateProfile = () => {
  const email = localStorage.getItem("email");
  const router = useRouter();
  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string;
    show: boolean;
  }>({ type: "success", message: "", show: false });
  const handleSave = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/job_seeker/profile",
        { ...values, email: email }
      );
      if (response.status === 201) {
        setAlert({
          type: "success",
          message: "Profile was created successfully",
          show: true,
        });
        const { profileId } = response.data;
        localStorage.setItem("profileId", profileId);
        resetForm();
        router.push("/job-seeker/get-all");
        setTimeout(() => {
          setAlert((prev) => ({ ...prev, show: false }));
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setAlert({
        type: "error",
        message: "Profile creation was unsuccessful",
        show: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationschema}
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => handleSave(values, formikHelpers)}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form>
            <Box marginTop="24px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="h2" fontWeight={500} fontSize="18px">
                  Create profile
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Box>
              <Box marginTop="24px">
                <Grid container rowGap="12px" columnGap="12px">
                  <Grid item md={4} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="name"
                      label="Name"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      values={values?.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={4} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="role"
                      label="Role"
                      fullWidth
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                      values={values?.role}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={4} sm={5} xs={12}>
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
                  <Grid item md={4} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="experience"
                      label="Experience"
                      fullWidth
                      error={touched.experience && Boolean(errors.experience)}
                      helperText={touched.experience && errors.experience}
                      values={values?.experience}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={4} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="salary"
                      label="Expected salary"
                      fullWidth
                      error={touched.salary && Boolean(errors.salary)}
                      helperText={touched.salary && errors.salary}
                      values={values?.salary}
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

export default CreateProfile;
