import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    mobile: '',
    address: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState(''); // State to hold email error message
  const navigate = useNavigate(); // Initialize useHistory hook

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect user to home page if they are already authenticated
      navigate('/home');
    }
  }, []); // Run this effect only once, on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(formData.password, formData.passwordConfirm)
    if (formData.password !== formData.passwordConfirm) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ROUTE}api/user/register`, formData);
      console.log(response.data);

      // Assuming the response includes the JWT token
      const { token } = response.data;

      // Save token to local storage or cookie for future use
      localStorage.setItem('token', token);

      navigate('/home');

    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === 'Email already exists') {
            // Email already exists, show error message
            setEmailError('Email already exists');
          } else {
            // Other errors, log to console or handle as needed
            console.log(error);
          }    
        }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h2 className="text-center">Registration</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegistration}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {emailError && <small className="text-danger">{emailError}</small>} {/* Show email error message */}
                </div>
                <div className="form-group">
                  <label htmlFor="userName">User Name:</label>
                  <input
                    id="userName"
                    type="text"
                    name="userName"
                    className="form-control"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password:</label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="form-control"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                  />
                  {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-2">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
