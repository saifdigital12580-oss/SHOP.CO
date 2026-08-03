import React from "react";
import "../../Styles/dashboardtimeline.css";

const activities = [

  {
    icon: "🛒",
    color: "#22c55e",
    title: "New Order Received",
    text: "Order #12345 has been placed.",
    time: "2 min ago",
  },

  {
    icon: "👤",
    color: "#3b82f6",
    title: "New Customer",
    text: "Ali Khan created an account.",
    time: "12 min ago",
  },

  {
    icon: "📦",
    color: "#8b5cf6",
    title: "Product Updated",
    text: "Gaming Mouse stock updated.",
    time: "45 min ago",
  },

  {
    icon: "💰",
    color: "#f97316",
    title: "Revenue Increased",
    text: "Today's sales reached Rs 24,500.",
    time: "Today",
  },

];

const DashboardTimeline = () => {
  return (

    <div className="timelineCard">

      <div className="timelineHeader">

        <h2>Recent Activity</h2>

        <span>Live</span>

      </div>

      {

        activities.map((item,index)=>(

          <div className="timelineItem" key={index}>

            <div
            className="timelineIcon"
            style={{background:item.color}}
            >

              {item.icon}

            </div>

            <div className="timelineContent">

              <h4>{item.title}</h4>

              <p>{item.text}</p>

            </div>

            <small>{item.time}</small>

          </div>

        ))

      }

    </div>

  );
};

export default DashboardTimeline;