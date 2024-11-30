import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserInfo.css";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    password: "",
    email: "",
    location: "",
    areasOfInterest: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    number: "",
    profilePhotoPath: "",
    points: 0,
  });

  // localStorage'dan veriyi çekiyoruz
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      // Kullanıcının puanlarını API'den alıyoruz
      fetchUserPoints(parsedUser.id); // userId kullanıyoruz
    }
  }, []);

  const fetchUserPoints = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/points/user/${userId}/total`
      ); // userId'yi gönderiyoruz
      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          points: response.data, // Puanları güncelleyirouz
        }));
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/user/update",
        userData
      );

      if (response.status === 200) {
        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("User information updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("There was an error updating the user.");
    }
  };

  return (
    <div className="user-info-container">
      <h1 className="EVENT_APP">EVENT APP</h1>
      <h1 className="REGISTER">User Info</h1>
      <div
        className="user-icon"
        style={{ backgroundImage: `url(${userData.profilePhotoPath})` }}
      ></div>

      <div className="label Point">Points:</div>
      <input
        type="text"
        name="points"
        value={userData.points || ""}
        className="input-field Rectangle14"
        readOnly
      />

      <div className="label Username">Username:</div>
      <input
        type="text"
        name="username"
        value={userData.username || ""}
        onChange={handleInputChange}
        className="input-field Rectangle2"
      />

      <div className="label Password">Password:</div>
      <input
        type="text"
        name="password"
        value={userData.password || ""}
        onChange={handleInputChange}
        className="input-field Rectangle5"
      />

      <div className="label Email">Email:</div>
      <input
        type="email"
        name="email"
        value={userData.email || ""}
        onChange={handleInputChange}
        className="input-field Rectangle6"
      />

      <div className="label Location">Location:</div>
      <input
        type="text"
        name="location"
        value={userData.location || ""}
        onChange={handleInputChange}
        className="input-field Rectangle7"
      />

      <div className="label AreasOfInterest">Areas Of Interest:</div>
      <input
        type="text"
        name="areasOfInterest"
        value={userData.areasOfInterest || ""}
        onChange={handleInputChange}
        className="input-field Rectangle8"
      />

      <div className="label Name">Name:</div>
      <input
        type="text"
        name="name"
        value={userData.name || ""}
        onChange={handleInputChange}
        className="input-field Rectangle9"
      />

      <div className="label Surname">Surname:</div>
      <input
        type="text"
        name="surname"
        value={userData.surname || ""}
        onChange={handleInputChange}
        className="input-field Rectangle10"
      />

      <div className="label DateOfBirth">Date Of Birth:</div>
      <input
        type="text"
        name="dateOfBirth"
        value={userData.dateOfBirth || ""}
        onChange={handleInputChange}
        className="input-field Rectangle11"
      />

      <div className="label Gender">Gender:</div>
      <input
        type="text"
        name="gender"
        value={userData.gender || ""}
        onChange={handleInputChange}
        className="input-field Rectangle12"
      />

      <div className="label Number">Number:</div>
      <input
        type="tel"
        name="number"
        value={userData.number || ""}
        onChange={handleInputChange}
        className="input-field Rectangle13"
      />

      <div className="Rectangle4">
        <button className="Register-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
