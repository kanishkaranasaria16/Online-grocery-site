import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import logo from '../IMAGE/grannygs.png';
import TextField from '@mui/material/TextField';
import { Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const SIGNIN = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.setHeaderFooterShow(false);
    return () => {
      context.setHeaderFooterShow(true);
    };
  }, [context]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/customer/signin", formData);
 
      if (response.status === 200) {
        setOpen(true);
        localStorage.setItem('token', response.data.token);
        setFormData({
          email: '',
          password: ''
        });
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed!");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <section className='section signInPage'>
        <div className='container'>
          <div className='box card p-3 shadow border=0'>
            <div className='text-center'>
              <img src={logo} alt='logo' />
            </div>
            <form className='mt-3' onSubmit={handleSubmit}>
              <h2 className='mb-3'><center>SIGN-IN</center></h2>
              <div className='form-group'>
                <TextField
                  required
                  name="email"
                  label="EMAIL"
                  className='w-100'
                  value={formData.email}
                  onChange={handleInputChange}
                /><br /><br />
                <TextField
                  required
                  name="password"
                  label="PASSWORD"
                  type="password"
                  className='w-100'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className='btn-blue w-100 mt-3'>
                SIGN-IN
              </Button>

              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

              <p>NOT REGISTERED? <Link to="/signUp" className='border-effect mt-3'>SIGN-UP</Link></p>
              <h6 className='mt-4 text-center'>Or continue with social account</h6>
              <Button className="signin w-100">
                <FcGoogle className="google" /><h6>Sign in with Google</h6>
              </Button>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Successfully signed in!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SIGNIN;
