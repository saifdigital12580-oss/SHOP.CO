import React, { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAngleDown, FaBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import "../../Styles/dashboardheader.css";

const Dashboardheader = () => {

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const now = new Date();

  const month = now.toLocaleString("en-US", {
    month: "short",
  });

  const year = now.getFullYear();

  const firstDay = new Date(
    year,
    now.getMonth(),
    1
  ).getDate();

  const lastDay = new Date(
    year,
    now.getMonth() + 1,
    0
  ).getDate();

  const realDate = `${month} ${firstDay} - ${month} ${lastDay}, ${year}`;


  useEffect(() => {

    const getNotifications = async () => {
      try {

        const response = await fetch(
          "https://sk-store-theta.vercel.app/auth/notifications",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setNotifications(data.notifications);
        }

      } catch (error) {
        console.log("Notification Fetch Error:", error);
      }
    };

    getNotifications();

    const interval = setInterval(getNotifications, 5000);

    return () => clearInterval(interval);

  }, []);


  return (
    <div className="headeradmin">

      <div className="part1">

        <div className="div1header">
          Welcom Back , SAIFULLAH KHAN : )
        </div>

        <div className="div2header">
          Here's What's happening with store today.
        </div>

      </div>


      <div className="part2">

        <div className="date">
          <MdOutlineDateRange />
          {realDate}
          <FaAngleDown />
        </div>


        {/* NOTIFICATION */}

        <div
          className="notification-wrapper"
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
        >

          <div className="ring">
            <FaBell />

            {notifications.length > 0 && (
              <span className="notification-count">
                {notifications.length}
              </span>
            )}

          </div>


          {showNotifications && (

            <div className="notification-dropdown">

              <div className="notification-title">
                Notifications
              </div>


              {notifications.length === 0 ? (

                <div className="no-notifications">
                  No notifications
                </div>

              ) : (

                notifications.map((notification) => (

                  <div
                    className="notification-item"
                    key={notification._id}
                  >

                    <div className="notification-icon">
                      <FaBell />
                    </div>


                    <div className="notification-content">

                      <div className="notification-message">
                        {notification.message}
                      </div>

                      <div className="notification-user">
                        {notification.user?.email}
                      </div>

                      <div className="notification-time">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

          )}

        </div>


        <div className="account">
          <MdOutlineAccountCircle />
        </div>

      </div>

    </div>
  );
};

export default Dashboardheader;