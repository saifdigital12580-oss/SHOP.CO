
import DashboardAnalytics from "./DashboardAnalytics";
import React, { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import "../../Styles/dashboardhome.css";
import DashboardRecentOrders from "./DashboardRecentOrders";
const DashboardHome = () => {



  const [stats, setStats] = useState({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
});

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const response = await fetch(
      "https://shop-cobackend.onrender.com/dashboard/stats"
    );

    const data = await response.json();

    if (data.success) {
      setStats(data.dashboard);
    }
  } catch (error) {
    console.log(error);
  }
};




  return (
    <>
     <div className='dashboard-analytics'>

        <div className='fourdivparent'>

          {/* First Box */}
          <div className='onebox'>
            <div className='box1admin'>
              <div className='money'>
                <MdAttachMoney />
              </div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Revenue</div>
              <div className='boxadmin2'>Rs. {stats.totalRevenue}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />00.0%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>

          {/* Second Box */}
          <div className='onebox'>
            <div className='box1admin'>
              <div className='money'>
                <FaCartShopping />
              </div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Orders</div>
              <div className='boxadmin2'>{stats.totalOrders}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />00.0%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>

          {/* {Third box} */}
          <div className='onebox'>
            <div className='box1admin'>
              <div className='money'>
                <IoPeopleSharp />
              </div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Customers</div>
              <div className='boxadmin2'>{stats.totalUsers}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />00.0%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>
             {/* {fourth box} */}
          <div className='onebox'>
            <div className='box1admin'>
              <div className='money'>
                <FaBoxOpen />
              </div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Products</div>
              <div className='boxadmin2'>{stats.totalProducts}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />00.0%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>




        </div>








 <div className='analyticsdiv'>

<div className="analyticsbox1">
  <DashboardAnalytics />
</div>

<div className="analyticsbox2">
  Coming Soon...
</div>

<DashboardRecentOrders />
 </div>










      </div>






     








    </>
  )
}

export default DashboardHome
