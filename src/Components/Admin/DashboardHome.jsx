import React from 'react'
import { MdAttachMoney } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { IoAnalyticsSharp } from "react-icons/io5";
import "../../Styles/dashboardhome.css";
const DashboardHome = () => {
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
              <div className='boxadmin2'>$ 00,000.00</div>
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
              <div className='boxadmin2'>$ 00,000.00</div>
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
              <div className='boxadmin2'>$ 00,000.00</div>
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
                <IoAnalyticsSharp />
              </div>
            </div>

            <div className='box2admin'>
              <div className='boxadmin1'>Conversion Rate</div>
              <div className='boxadmin2'>$ 00,000.00</div>
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

{/* <div className='analyticsbox1'></div>
<div className='analyticsbox2'></div> */}


 </div>










      </div>






     








    </>
  )
}

export default DashboardHome
