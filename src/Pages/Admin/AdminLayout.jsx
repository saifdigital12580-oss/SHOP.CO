
import React from 'react'
import DashboardSidebar from '../../Components/Admin/DashboardSidebar'
import Dashboardheader from '../../Components/Admin/Dashboardheader'
import DashboardHome from '../../Components/Admin/DashboardHome'
import { Outlet } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import "../../Styles/adminlayout.css";

const AdminLayout = () => {
  const role = localStorage.getItem("role");

if (role !== "admin") {
  return <Navigate to="/" />;
}
  return (
    <>


      <div className="parent">

    <div className="div1">
      <DashboardSidebar/>
    </div>

    <div className="div2">
      <Dashboardheader/>
    </div>
    
    <div className="div3">
      <Outlet/>
    </div>

      </div>


    </>
  )
}

export default AdminLayout
