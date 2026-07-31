import React from 'react'
import "../Styles/footercomp.css"
import { FaFacebook } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
const FooterComp = () => {
  return (
    <>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />



      <div className='Blackdivparant'>
        <div className='Blackdiv'>
          <div className='fontdiv'><h1><b>STAY UPTO DATE ABOUT OUR LATEST OFFERS</b></h1></div>
          <div className='Buttondiv'>
           <input type="email" placeholder='Enter your email pasword' className='input'/>
            <button className='Buttons'>Subscribe to Newsletter</button>
          </div>
        </div>
        
      </div>


     <div className='Footerdiv'>
      
     <div className='Firstdiv'>
      <div className='Headings'><h1><b>SHOP.CO</b></h1></div>
      <div className='para'>We have clothes that suits your style and which you’re proud to wear. From women to men.</div>
      <div className='icons'><FaFacebook className='facebook' size={30}/><CiInstagram className='insta' size={30}/><FaTwitter className='tweeter' size={30}/></div>
     </div>
          




        <div className='seconddiv'>
          
          <div className='seconddivchildern'>
            <div className='Company'>COMPANY</div>
            <div className='links'>About</div>
            <div className='links'>Features</div>
            <div className='links'>Work</div>
            <div className='links'>Career</div>
          </div>

          <div className='seconddivchildern'>
             <div className='Company'>HELP</div>
            <div className='links'>Customer Support</div>
            <div className='links'>Delivery Details</div>
            <div className='links'>Terms & Conditions</div>
            <div className='links'>Privacy Policy</div>
          </div>

          <div className='seconddivchildern'>
             <div className='Company'>FAQ</div>
            <div className='links'>Account</div>
            <div className='links'>Manage Deliveries</div>
            <div className='links'>Orders</div>
            <div className='links'>Payments</div>
          </div>

          <div className='seconddivchildern'>
             <div className='Company'>RESOURCES</div>
            <div className='links'>Free e-Books</div>
            <div className='links'>Development Tutorial</div>
            <div className='links'>How to-Blog</div>
            <div className='links'>Youtube Playlist</div>
          </div>
        </div>










     </div>

<div className='box'>
 <div className='last'>Shop.co © 2000-2023, All Rights Reserved</div>
 <div className='last'><img src="/Frame 53.png" alt="" /></div>
</div>















    </>
  )
}

export default FooterComp
