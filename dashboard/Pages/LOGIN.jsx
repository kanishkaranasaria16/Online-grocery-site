import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import logo from "../Images/grannygs.png";
import { MyContext } from "../App";
import pattern from "../Images/pattern.webp";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar"; // Import Snackbar
import MuiAlert from "@mui/material/Alert"; // Import Alert
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LOGIN = () => {
  const [formfield, setFormfields] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const context = useContext(MyContext);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    context.setIsHide(true); // Ensure this matches the naming in App.js
  }, [context]);

  const onchangeInput = (e) => {
    setFormfields({
      ...formfield,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const login = (e) => {
    e.preventDefault();

    // Input validation
    if (formfield.email === "") {
      openSnackbar("EMAIL IS EMPTY", "error");
      return false;
    }

    if (formfield.password === "") {
      openSnackbar("PASSWORD IS EMPTY", "error");
      return false;
    }

    axios
      .post("http://localhost:4000/api/users/signin", formfield)
      .then((res) => {
        console.log("Response from server:", res); // Log full response object

        if (res.status === 200) { // Check for successful status
          openSnackbar("LOGIN SUCCESSFUL", "success");

          context.setLogin(true); // Set isLogin state to true
          context.setIsHide(false); // Show the header and sidebar after login

          // Redirect after a brief delay if needed
          setTimeout(() => {
            navigate("/"); // Navigate after successful login
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error and display a meaningful message
        const errorMessage = error.response?.data?.msg || "LOGIN FAILED"; // Get specific error message
        openSnackbar(errorMessage, "error"); // Show the error message directly
      });
  };

  return (
    <div>
      <img src={pattern} className="pattern" alt="pattern" />
      <section className="loginsection">
        <div className="loginbox">
          <div className="logo text-center">
            <img src={logo} className="logo" alt="logo" />
            <h5 className="font-weight-bold">LOGIN TO DASHBOARD</h5>
          </div>
          <div className="wrapper mt-3 card border p-3">
            <form onSubmit={login}>
              <div className="form-group mb-3 position-relative">
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ENTER YOUR EMAIL"
                  name="email"
                  onChange={onchangeInput}
                />
              </div>
              <div className="form-group mb-3 position-relative">
                <span className="icon">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="ENTER YOUR PASSWORD"
                  name="password"
                  onChange={onchangeInput}
                />
              </div>
              <div className="form-group">
                <Button
                  className="btn-blue btn-lg w-100 btn-big"
                  type="submit" // Keep as submit
                >
                  SIGN-IN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Snackbar for alerts */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LOGIN;
