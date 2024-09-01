import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
const ApplyForJob = ({
  open,
  onClose,
  createId,
}: {
  open: boolean;
  onClose: any;
  createId: number;
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400, // set the width of the modal
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    maxHeight: "90vh",
    overflow: "auto", // enable scrolling if content is larger than the modal
  };
  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string;
    show: boolean;
  }>({ type: "success", message: "", show: false });
  const profileId = localStorage.getItem("profileId");
  const email = localStorage.getItem("email");
  const router = useRouter();
  const handleSave = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/job_seeker/apply",
        { ...values, email: email, profileId: profileId, createId: createId }
      );
      if (response.status === 201) {
        setAlert({
          type: "success",
          message: "Job was sucessfully applied",
          show: true,
        });
        const { profileId } = response.data;
        onClose();
        setTimeout(() => {
          setAlert((prev) => ({ ...prev, show: false }));
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error applying job",
        show: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="small-modal-title">
        <Formik
          validationSchema={validationschema}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) =>
            handleSave(values, formikHelpers)
          }
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Box sx={modalStyle}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="h6" id="small-modal-title">
                  Apply for job
                </Typography>
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>
                <Grid container rowGap="12px" columnGap="12px">
                  <Grid item md={4} sm={5} xs={12}>
                    <Field
                      as={TextField}
                      size="small"
                      name="name"
                      label="Name"
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
                      error={touched.salary && Boolean(errors.salary)}
                      helperText={touched.salary && errors.salary}
                      values={values?.salary}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Box
                  marginTop="16px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <Box></Box>
            </Box>
          )}
        </Formik>
      </Modal>
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

export default ApplyForJob;
