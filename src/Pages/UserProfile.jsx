import React, { useEffect, useState } from "react";
import "../Styles/UserProfile.css";

import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaEdit,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import EditProfileModal from "../Components/EditProfileModal";


const UserProfile = () => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();


  // =====================================
  // FETCH LOGGED-IN USER PROFILE
  // =====================================

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await fetch(
          "https://shop-cobackend.onrender.com/auth/my-profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.user) {

          throw new Error(
            data.message || "Unable to load your profile."
          );

        }

        setUser(data.user);

      } catch (err) {

        console.error("Profile Error:", err);

        setError(err.message || "Something went wrong.");

      } finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, []);


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="profileLoading">

        <div className="profileLoader"></div>

        <h2>Loading Your Profile...</h2>

        <p>Please wait while we fetch your account details.</p>

      </div>

    );

  }


  // =====================================
  // ERROR
  // =====================================

  if (error || !user) {

    return (

      <div className="profileError">

        <FaUserCircle className="errorProfileIcon" />

        <h2>Unable to Load Profile</h2>

        <p>
          {error || "Your profile could not be found."}
        </p>

        <button
          onClick={() => navigate("/login")}
          className="profileLoginBtn"
        >
          Go To Login
        </button>

      </div>

    );

  }


  // =====================================
  // MEMBER SINCE
  // =====================================

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";


  // =====================================
  // PROFILE IMAGE
  // =====================================

  const profileImage = user.profileImage;


  // =====================================
  // UPDATE PROFILE
  // =====================================

  const handleProfileUpdate = (updatedUser) => {

    setUser(updatedUser);

    setShowModal(false);

    toast.success("Profile updated successfully!");

  };


  // =====================================
  // UI
  // =====================================

  return (

    <div className="profilePage">

      {/* =====================================
          PROFILE HERO
      ===================================== */}

      <div className="profileContainer">

        <div className="profileCover">

          <div className="coverOverlay"></div>

          <div className="coverText">

            <span>MY ACCOUNT</span>

            <h2>Welcome Back, {user.username}!</h2>

            <p>
              Manage your personal information and account details.
            </p>

          </div>

        </div>


        {/* =====================================
            PROFILE INFORMATION
        ===================================== */}

        <div className="profileContent">

          <div className="profileAvatarWrapper">

            {profileImage ? (

              <img
                src={profileImage}
                alt="Profile"
                className="profileAvatarImage"
              />

            ) : (

              <FaUserCircle className="profileAvatar" />

            )}

            <span className="profileOnlineDot"></span>

          </div>


          <div className="profileMainInfo">

            <h1>{user.username}</h1>

            <p className="profileEmail">

              <FaEnvelope />

              {user.email}

            </p>


            <div className="profileBadges">

              <span className="roleBadge">

                <FaUserShield />

                {user.role || "User"}

              </span>


              <span className="memberBadge">

                <FaCalendarAlt />

                Member Since {memberSince}

              </span>

            </div>

          </div>


          <button
            className="editBtn"
            onClick={() => setShowModal(true)}
          >

            <FaEdit />

            Edit Profile

          </button>

        </div>

      </div>



      {/* =====================================
          ACCOUNT DETAILS
      ===================================== */}

      <div className="profileDetailsSection">


        <div className="profileSectionHeading">

          <div>

            <span className="profileSmallTitle">
              PERSONAL INFORMATION
            </span>

            <h2>Account Details</h2>

            <p>
              Your personal information associated with this account.
            </p>

          </div>

        </div>



        <div className="infoSection">


          {/* USERNAME */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaUserCircle className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Username</h3>

              <p>{user.username || "Not provided"}</p>

            </div>

          </div>



          {/* EMAIL */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaEnvelope className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Email Address</h3>

              <p>{user.email || "Not provided"}</p>

            </div>

          </div>



          {/* PHONE */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaPhoneAlt className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Phone Number</h3>

              <p>{user.phone || "Not added yet"}</p>

            </div>

          </div>



          {/* ADDRESS */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaMapMarkerAlt className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Address</h3>

              <p>{user.address || "Not added yet"}</p>

            </div>

          </div>



          {/* ROLE */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaUserShield className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Account Role</h3>

              <p className="roleText">

                {user.role || "User"}

              </p>

            </div>

          </div>



          {/* MEMBER SINCE */}

          <div className="infoCard">

            <div className="infoIconWrapper">

              <FaCalendarAlt className="infoIcon" />

            </div>

            <div className="infoText">

              <h3>Member Since</h3>

              <p>{memberSince}</p>

            </div>

          </div>


        </div>


        {/* =====================================
            SHOPPING SECTION
        ===================================== */}

        <div className="profileShoppingCard">

          <div className="shoppingIconWrapper">

            <FaShoppingBag />

          </div>


          <div className="shoppingCardText">

            <h3>Continue Shopping</h3>

            <p>
              Explore our latest arrivals and discover products
              you might love.
            </p>

          </div>


          <button
            className="shoppingBtn"
            onClick={() => navigate("/shoppage")}
          >

            Explore Products

            <FaArrowRight />

          </button>

        </div>


      </div>



      {/* =====================================
          EDIT PROFILE MODAL
      ===================================== */}

      {showModal && (

        <EditProfileModal

          user={user}

          onClose={() => setShowModal(false)}

          onUpdate={handleProfileUpdate}

        />

      )}


    </div>

  );

};


export default UserProfile;