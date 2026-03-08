import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; 
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import logo from "../IMAGE/grannygs.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const SIGNUP = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "", 
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.setHeaderFooterShow(false);
  }, [context]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/customer/signup", formData);
    
      setSuccess("Signup successful!");
      setError("");

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "", 
        password: "",
      });

      navigate("/signin");
      
    } catch (error) {
      setError(error.response?.data?.msg || "Signup failed!");
      setSuccess("");
    }
  };

  return (
    <div>
      <section className="section signUpPage">
        <div className="container">
          <div className="box card p-3 shadow border=0">
            <div className="text-center">
              <img src={logo} alt="logo" />
            </div>
            <form className="mt-3" onSubmit={handleSubmit}>
              <h2 className="mb-3">
                <center>SIGN-UP</center>
              </h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      required
                      name="name"
                      label="NAME"
                      className="w-100"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      required
                      name="phone"
                      label="PHONE NO."
                      className="w-100"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      required
                      name="email"
                      label="EMAIL"
                      className="w-100"
                      value={formData.email}
                      onChange={handleInputChange}
                    /><br /><br />
                    <TextField
                      required
                      name="address"
                      label="ADDRESS"
                      className="w-100"
                      value={formData.address}
                      onChange={handleInputChange}
                    /><br /><br />
                    <TextField
                      required
                      name="password"
                      label="PASSWORD"
                      className="w-100"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="btn-blue w-100 mt-3">SIGN-UP</Button>

              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

              <h6 className="mt-4 text-center">
                Or continue with social account
              </h6>
              <Button className="signin w-100">
                <FcGoogle className="google" /><h6>Sign in with google</h6>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SIGNUP;
