// Signup.js
import React, { useState } from 'react';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    role: 'User', // Default role
  });
  let navigate = useNavigate()
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let {message} = await AxiosService.post(ApiRoutes.SIGNUP.path, formData);
      toast.success(message);
       navigate('/login');
    } catch (error) {
        toast.error(error.message || "Signup Failed")
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <div className='signup-wrapper'>
      <form onSubmit={handleSubmit} >
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
