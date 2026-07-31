import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuLayers3 } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import "../../Styles/dashboardsidebar.css";

const DashboardSidebar = () => {
  const navigate = useNavigate();











  
  return (
    <>
      {/* <h1>Side bar</h1> */}
       <div className='sidebar' >


              <div className='Firstdivadmin'>
               <div className='onediv'><LuLayers3 />SHOP.CO</div>
               <div className='twodiv'>
                <div className='circlepic'></div>
                <div className='name'  onClick={() => navigate("/")}>SHOP.CO <img src="Vector (1).png" alt="" /></div>
               </div>
              </div>



                 <div className='NavegateElements'>


                 <Link to="/adminpanel" >
                    <li className='home'><FaHome /> Overview   </li>
                 </Link>

                <Link to="/adminpanel/admin-products">
                <li className='product'><AiFillProduct /> Product  </li>
                </Link>

                <Link to="/adminpanel/users">
                <li className='product'><FaRegUser /> Users  </li>
                </Link>



                 </div>











               
               
            </div>

    </>
  )
}

export default DashboardSidebar
