"use client";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

interface SignupState {
  email: string;
  password: string;
  name: string;
  role: string;
}

const SignUp = ({ login }: { login: any }) => {
  const [signupData, setSignupData] = useState<SignupState>({
    email: "",
    password: "",
    name: "",
    role: "job_seeker", // Default role
  });
  const [alert, setAlert] = useState<{
    type: AlertColor;
    message: string;
    show: boolean;
  }>({ type: "success", message: "", show: false });

  const handleChange = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        signupData
      );
      if (response.status === 200 || response.status === 201) {
        setAlert({
          type: "success",
          message: "SignUp is successful",
          show: true,
        });

        login(); // Redirect to login
        setTimeout(() => {
          setAlert((prev) => ({ ...prev, show: false }));
        }, 3000);
      }
    } catch (error) {
      console.log(error)
      setAlert({
        type: "error",
        message: "Signup is not successful.",
        show: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: "#FBEAEB",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="16px"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap="24px"
                p="24px" // Padding inside the container
                borderRadius="8px" // Rounded corners
                boxShadow={3} // Shadow for depth
                bgcolor="white" // Background color for the container
                width="400px" // Width of the container
                maxWidth="100%"
                sx={{ backgroundColor: "#F96167" }}
              >
                <Typography
                  variant="h2"
                  fontSize="24px"
                  fontWeight="500"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Sign Up
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  size="small"
                  value={signupData.name}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D54C50", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B74141", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B74141", // Border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FADADD", // Default label color (light grey)
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FADADD", // Label color when focused (off-white)
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  size="small"
                  value={signupData.email}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D54C50", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B74141", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B74141", // Border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FADADD", // Default label color (light grey)
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FADADD", // Label color when focused (off-white)
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  size="small"
                  value={signupData.password}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D54C50", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B74141", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B74141", // Border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FADADD", // Default label color (light grey)
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FADADD", // Label color when focused (off-white)
                    },
                  }}
                />
                <FormControl
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#D54C50", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#B74141", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#B74141", // Border color when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#FADADD", // Default label color (light grey)
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FADADD", // Label color when focused (off-white)
                    },
                  }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Role</InputLabel>
                  <Select
                    label="Role"
                    name="role"
                    value={signupData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value={"employer"}>Employer</MenuItem>
                    <MenuItem value={"job_seeker"}>Job Seeker</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#F96167",
                    "&:hover": {
                      backgroundColor: "#D94A4F", // Darker shade for hover
                    },
                    color: "#FADADD", // White text
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Box display="flex" flexDirection="row" gap="4px">
                  <Typography variant="h4" fontSize="14px" fontWeight="400">
                    Already an user?{" "}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontSize="14px"
                    fontWeight="400"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={login}
                  >
                    Login
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </form>
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

export default SignUp;
