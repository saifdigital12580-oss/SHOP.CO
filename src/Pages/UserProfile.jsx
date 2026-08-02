import React from "react";
import "../Styles/UserProfile.css";
import  { useEffect, useState } from "react";;
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";
import toast from "react-hot-toast";
import EditProfileModal from "../Components/EditProfileModal";

const UserProfile = () => {


const [user,setUser]=useState(null);
const [editMode, setEditMode] = useState(false);
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [showModal, setShowModal] = useState(false);

useEffect(()=>{

fetch("https://shop-cobackend.onrender.com/auth/my-profile",{

credentials:"include"

})

.then(res=>res.json())

.then(data=>{

setUser(data.user);

setUsername(data.user.username);

setEmail(data.user.email);

});

},[]);


  // const username = localStorage.getItem("username");
  // const role = localStorage.getItem("role");
  // const email = localStorage.getItem("email");
if(!user){
return(
<div className="profileLoading">
Loading Your Profile...
</div>
);
}





const updateProfile = async () => {
const response = await fetch(
"https://shop-cobackend.onrender.com/auth/update-profile",
{
method:"PUT",
credentials:"include",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
email
})
}
);
const data = await response.json();
if(data.success){
toast.success(data.message);
setUser(data.user);
setEditMode(false);
localStorage.setItem(
"username",
data.user.username
);
}
}


  return (
    <div className="profilePage">

      <div className="profileContainer">

        {/* Cover */}

        <div className="profileCover"></div>

        {/* Profile */}

        <div className="profileContent">

          <FaUserCircle className="profileAvatar" />

          <h1>{user.username}</h1>

          <p>{user.email}</p>

          <div className="roleBadge">
           {user.role}
          </div>



<button
className="editBtn"
onClick={()=>setShowModal(true)}
>
<FaEdit />
Edit Profile
</button>



{
editMode &&
<div className="editForm">
<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
placeholder="Username"
/>
<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
/>
<button
className="saveBtn"
onClick={updateProfile}
>
Save Changes
</button>
</div>
}





        </div>

      </div>

      {/* Information */}

      <div className="infoSection">

        <div className="infoCard">

          <FaEnvelope className="infoIcon"/>

          <h3>Email</h3>

          <p>{user.email}</p>

        </div>

        <div className="infoCard">

          <FaUserShield className="infoIcon"/>

          <h3>Role</h3>

         <p>{user.role}</p>
        </div>

        <div className="infoCard">

          <FaCalendarAlt className="infoIcon"/>

          <h3>Member Since</h3>

          <p>August 2026</p>

        </div>

      </div>
      
      {
showModal && (

<EditProfileModal

user={user}

onClose={()=>setShowModal(false)}

onUpdate={setUser}

/>

)
}

    </div>
  );
};

export default UserProfile;