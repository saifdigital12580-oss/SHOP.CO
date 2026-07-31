import React from "react";
import "../Styles/UserProfile.css";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  return (
    <div className="profilePage">

      <div className="profileCard">

        <FaUserCircle className="profileIcon"/>

        <h1>{username}</h1>

        <p>{email}</p>

        <span>{role}</span>

      </div>

    </div>
  );
};

export default UserProfile;