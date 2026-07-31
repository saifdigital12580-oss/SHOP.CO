import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import "../../Styles/dashboardheader.css";
const Dashboardheader = () => {
  return (
    <>
      <div className='headeradmin'>
        <div className='part1'>
            <div className='div1header'>Welcom Back , SAIFULLAH KHAN : ) </div>
            <div className='div2header'>Here's What's happening with store today.</div>

        </div>






        <div className='part2'>
          <div className='date'><MdOutlineDateRange />May 1 - May 30,2026 <FaAngleDown /></div>
          <div className='ring'><FaBell /></div>
          <div className='account'><MdOutlineAccountCircle /></div>
        </div>
        
    </div>
    </>
  )
}

export default Dashboardheader
