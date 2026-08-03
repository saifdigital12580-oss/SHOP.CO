
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



const [stats, setStats] =useState({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  topProducts: [],
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

      <div className="dashboardHero">
  <div className="heroLeft">
    <span className="heroBadge">
      👋 Welcome Back
    </span>
    <h1>
      Hello, Saifullah Khan
    </h1>
    <p>
      Manage products, track orders, monitor revenue and grow your business
      from one beautiful dashboard.
    </p>
  </div>
  <div className="heroRight">
    <button className="heroBtn addProductBtn">
      ➕ Add Product
    </button>
    <button className="heroBtn exportBtn">
      📄 Export Report
    </button>
  </div>
</div>











        <div className='fourdivparent'>

          {/* First Box */}
          <div className='onebox'>
            <div className='box1admin'>
<div className="money revenueIcon">
    <MdAttachMoney />
</div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Revenue</div>
              <div className='boxadmin2' style={{color:"#22c55e"}}>Rs {stats.totalRevenue.toLocaleString()}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />18%
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
              <div className='boxadmin2'>{stats.totalOrders.toLocaleString()}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />5%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>

          {/* {Third box} */}
          <div className='onebox'>
            <div className='box1admin'>
<div className="money userIcon">
    <IoPeopleSharp />
</div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Customers</div>
              <div className='boxadmin2'>{stats.totalUsers.toLocaleString()}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />1.5%
                </span>
                {" "}vs Last Week
              </div>
            </div>
          </div>
             {/* {fourth box} */}
          <div className='onebox'>
            <div className='box1admin'>
<div className="money productIcon">
    <FaBoxOpen />
</div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Total Products</div>
              <div className='boxadmin2'>{stats.totalProducts.toLocaleString()}</div>
              <div className='boxadmin3'>
                <span className='span'>
                  <FaArrowUp />20%
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

    <div className="topHeading">

        <span className="badge">
            🏆 Best Seller
        </span>

        <h2>Top Selling Product</h2>

    </div>

    {
        stats.topProducts.length > 0 && (

            <>

                <img
                    className="topImage"
                    src={stats.topProducts[0].image}
                    alt=""
                />

                <h3 className="productName">
                    {stats.topProducts[0].title}
                </h3>

                <div className="rating">
                    ⭐⭐⭐⭐⭐
                </div>

                <div className="topStats">

                    <div className="statCard">

                        <span>Orders</span>

                        <h4>{stats.topProducts[0].sold}</h4>

                    </div>

                    <div className="statCard">

                        <span>Revenue</span>

                        <h4>
                            Rs {stats.topProducts[0].revenue}
                        </h4>

                    </div>

                </div>

            </>

        )
    }

</div>


<DashboardRecentOrders />
 </div>










      </div>






     








    </>
  )
}

export default DashboardHome
