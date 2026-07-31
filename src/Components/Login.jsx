import LoginCelebration from "../Components/LoginCelebration";
import toast from "react-hot-toast";
import React, { useState } from 'react'
import "../Styles/Login.css"
import { FaEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { BsGoogle } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { data, Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [active, setactive] = useState(false)

  const [showCelebration, setShowCelebration] = useState(false);
const [userName, setUserName] = useState("");



  //  Api integration

  const handlelogin = async () => {
  try {
    const response =await fetch("http://localhost:1000/auth/login-user", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});

    const data = await response.json();

    console.log(data);

 if (response.ok) {
 
  if (data.success) {

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", data.role);

    setUserName(data.user.username);

    setShowCelebration(true);

    toast.success("Login Successful 🎉");

    setTimeout(() => {
           navigate("/")
    }, 3600);

}

  localStorage.setItem("login", "true");

  localStorage.setItem("role", data.user.role);

  localStorage.setItem("userId", data.user._id);

  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email", data.user.email);
  

;
}else {
      setMessage(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};



  return (
    <>
      <div className='loginpage'>

        <div className='partsoflogin1'>
          <div className='TheGamers' onClick={() => navigate("/")} ><h1>The  SHOP.CO</h1> </div>



          <div className='welcome'><h1>Welcome Back</h1> </div>
          <div className='signinto'>Sign in to continue to your account </div>





          <div><FaEnvelope />  Email Address: <br />
            <input value={email}
              onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Type Email Here' className={`emailbar ${active ? "active" : ""}`}
            // onClick={()=> setactive(!active)}
            // onFocus={() => setactive(true)}
            // onBlur={()=> setactive(false)}          
            />

          </div>




          <br />





          <div><CiLock />  Password: <br />
            <input value={password}
              onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Type Password Here' className={`password ${active ? "active" : ""}`} />
          </div>




          <br />




          <div className=''>
            <input type="checkbox" className='cheakbox' />Remember Me </div> <br />

          <div className='forgetbox'> Forgot password?</div>




          <br />




          <button onClick={handlelogin} className='logininbox'>Login In</button>

          {
            message ? <><h1>{message}</h1></> : <></>
          }


          <br /><br /><br />



          <div className='margin'> -------------------Or Continue With---------------------</div>


          <br /><br />


          <div><button className='googlesignin'><BsGoogle />............... Continue With Google</button></div>



          <br /><br />





          <div className='margin'>Don't have an account? 
            <Link to="/register" >
            <span className='creataccount'> Create one now</span>
            </Link>
            </div>



          <br /><br />



          <div className='margin2'>
            <span className='creataccount' onClick={() => navigate("/")}>

              Back to Home

            </span>
          </div>



        </div>














        <div className='partsoflogin2'>
          <div className='heading'><h1>Welcome to The SHOP.CO</h1></div>
          <div className='welcomparagraph'>Discover a wide range of high-quality products at affordable prices. We are committed to providing a secure, convenient, and enjoyable shopping experience for every customer.</div>

          <div className='points'>✅ Premium Quality Products</div>
          <div className='points'> ✅ Competitive Prices</div>
          <div className='points'> ✅ Fast & Reliable Delivery</div>
          <div className='points'>  ✅ Easy Returns & Exchanges</div>




        </div>

      </div>

      {showCelebration && (
    <LoginCelebration
        username={userName}
        onClose={() => setShowCelebration(false)}
    />
)}
    </>
  )
}

export default Login
