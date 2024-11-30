import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    location: '',
    areasOfInterest: '',
    name: '',
    surname: '',
    dateOfBirth: '',
    gender: '',
    number: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.location ||
      !formData.areasOfInterest ||
      !formData.name ||
      !formData.surname ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.number
    ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Kullanıcı bilgilerini gönderiyoruz
      const userResponse = await axios.post('http://localhost:8080/user/register', formData);
      
      // JSON yanıtı alıp ID'yi çıkarıyoruz
      const userId = userResponse?.data?.id;
      console.log('User ID:', userId);
      console.log('User response:', userResponse);
    
      if (userId) {
        // Puan kaydını gönderiyoruz
        await axios.post('http://localhost:8080/points/register', userId , {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    
      // Profil fotoğrafını yüklüyoruz (varsa)
      if (profilePhoto && userId) {
        const formDataPhoto = new FormData();
        formDataPhoto.append('file', profilePhoto);
        formDataPhoto.append('userId', userId);
    
        console.log("FormData being sent:", formDataPhoto);
    
        await axios.post('http://localhost:8080/user/uploadPhoto', formDataPhoto, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
    
      alert('Registration successful.');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'An error occurred during registration.');
    }    
  };
  
  return (
    <div className="container">
      <div className="EVENT_APP">EVENT APP</div>
      <div className="REGISTER">REGISTER</div>

      {}
      <label htmlFor="file-input" className="user-icon">
        {profilePhoto ? (
          <img
            src={URL.createObjectURL(profilePhoto)}
            alt="Profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        ) : (
          <span></span>
        )}
      </label>
      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <form onSubmit={handleSubmit}>
        <div className="label Username">Username:</div>
        <input
          type="text"
          className="input-field Rectangle2"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <div className="label Password">Password:</div>
        <input
          type="password"
          className="input-field Rectangle5"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="label Email">Email:</div>
        <input
          type="email"
          className="input-field Rectangle6"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="label Location">Location:</div>
        <input
          type="text"
          className="input-field Rectangle7"
          placeholder="Enter your location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <div className="label AreasOfInterest">Areas Of Interest:</div>
        <input
          type="text"
          className="input-field Rectangle8"
          placeholder="Enter your interests"
          name="areasOfInterest"
          value={formData.areasOfInterest}
          onChange={handleChange}
        />

        <div className="label Name">Name:</div>
        <input
          type="text"
          className="input-field Rectangle9"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <div className="label Surname">Surname:</div>
        <input
          type="text"
          className="input-field Rectangle10"
          placeholder="Enter your surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />

        <div className="label DateOfBirth">Date Of Birth:</div>
        <input
          type="date"
          className="input-field Rectangle11"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <div className="label Gender">Gender:</div>
        <input
          type="text"
          className="input-field Rectangle12"
          placeholder="Enter your gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <div className="label Number">Number:</div>
        <input
          type="text"
          className="input-field Rectangle13"
          placeholder="Enter your number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />

        <div className="Rectangle4">
          <button type="submit" className="Register-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
