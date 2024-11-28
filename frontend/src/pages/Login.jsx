import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const loginData = {
      username: username,
      password: password,
    };

    const adminLoginData = {
      adminName: username,
      adminPassword: password,
    };

    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("role");

    console.log("Gönderilen Login Verisi:", loginData);

    let isUserLoginFailed = false;
    let isAdminLoginFailed = false;

    try {
      // Kullanıcı girişi kontrolü
      const userResponse = await axios.post(
        "http://localhost:8080/user/login",
        loginData
      );
      console.log("User login isteği yanıtı:", userResponse);

      if (userResponse.data) {
        console.log("User Response Data:", userResponse.data);
        localStorage.setItem("role", "user");
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        navigate("/mainpage");
        return;
      }
      else{
        isUserLoginFailed = true;
      }
    } catch (userError) {
      console.error(
        "User login failed:",
        userError.response ? userError.response.data : userError.message
      );
      isUserLoginFailed = true;
    }

    try {
      // Admin girişi kontrolü
      const adminResponse = await axios.post(
        "http://localhost:8080/admin/login",
        adminLoginData
      );
      console.log("Admin login isteği yanıtı:", adminResponse);

      if (adminResponse.data) {
        console.log("Admin Response Data:", adminResponse.data);
        localStorage.setItem("role", "admin");
        localStorage.setItem("admin", JSON.stringify(adminResponse.data));
        navigate("/mainpage");
      } else {
        alert("Invalid admin username/email or password.");
        isAdminLoginFailed = true;
      }
    } catch (adminError) {
      console.error(
        "Admin login failed:",
        adminError.response ? adminError.response.data : adminError.message
      );
      isAdminLoginFailed = true;
    }

    if (isUserLoginFailed && isAdminLoginFailed) {
      setIsLoginFailed(true);
      alert("Login failed. Please check your information and try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="event-app-title">EVENT APP</h1>
      <h1 className="login-title">LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="username-email">Username or Email :</label>
          <div className="input-rectangle input-username">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
        </div>
        <div className="input-group">
          <label className="password">Password :</label>
          <div className="input-rectangle input-password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
        </div>
        <div className="login-button-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <p className="register-message">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Register now.
        </span>
      </p>
    </div>
  );
};

export default Login;
