
import React, { useState } from 'react'
import "../Styles/register.css"
import { FaEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { BsGoogle } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    // APi Integration 

    const handleRegister = async () => {
  try {
    const response = await fetch("https://shop-cobackend.onrender.com/auth/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      alert("Registered Successfully");
      navigate("/login");
    } else {
      setMessage(data.message || "Registration failed");
    }
  } catch (error) {
    console.log("Server:", error.message);
  }
};

    const [active, setactive] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <div className='loginpage'>

                <div className='partsoflogin1'>
                    <div className='TheGamers' onClick={() => navigate("/")} ><h1>The SHOP.CO</h1> </div>

                    <div className='welcome'><h1>CREATE ACCOUNT</h1> </div>
                    <div className='signinto'>Join us to start your horological journey</div>

                    <div>  Username : <br />
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='     Type Username Here  ✉️' className={`emailbar ${active ? "active" : ""}`} />

                    </div>
                    <div> Email Address: <br />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='     Type Email Here  ✉️' className={`emailbar ${active ? "active" : ""}`} />

                    </div>
                    <br />

                    <div><CiLock />  Password: <br />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='    Type Password Here  🔐' className={`password ${active ? "active" : ""}`} />
                    </div>

                    <br />
                    <div className=''>
                        <input type="checkbox" className='cheakbox' />Remember Me </div> <br />

                    <div className='forgetbox'> Forgot password?</div>

                    <br />




                    <button onClick={handleRegister} className='logininbox'>Create Account </button>

                    {
                        message ? <><h1>{message}</h1></> : <></>
                    }



                    <br /><br /><br />



                    <div className='margin'> -------------------Or Continue With---------------------</div>


                    <br /><br />


                    <div><button className='googlesignin'><BsGoogle />............... Continue With Google</button></div>



                    <br /><br />





                    <div className='margin'>Don't have an account? 
                        <Link to="/login" >
                        <span className='creataccount'> Login</span>
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
        </>
    )
}

export default Register
