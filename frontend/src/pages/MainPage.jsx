import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleAdminPageClick = async () => {
    if (role !== 'admin') {
      alert("You are not allowed to access the admin page.");
      return;
    }
    navigate('/adminpage');
  };

  const handleAccountSettingsClick = () => {
    if (role !== 'user') {
      alert("You are not allowed to access the user info page.");
      return;
    }
    navigate('/userinfo');
  };

  return (
    <div className="main-container">
      <h1 className="event-app">Event App</h1>
      <div className="engineer" onClick={handleAdminPageClick}></div>
      <div className="account-settings" onClick={handleAccountSettingsClick}></div>
    </div>
  );
};

export default MainPage;
