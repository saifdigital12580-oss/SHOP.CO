import React, { useEffect, useState } from "react";
import "../../Styles/dashboardcustomers.css";

const DashboardCustomers = () => {

const [users,setUsers]=useState([]);

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers=async()=>{

const response=await fetch(

"https://sk-store-theta.vercel.app/dashboard/latest-customers"

);

const data=await response.json();

if(data.success){

setUsers(data.users);

}

};

return(

<div className="customerCard">

<h2>Latest Customers</h2>

{

users.map((user)=>(

<div
className="customerItem"
key={user._id}
>

<div className="avatar">

{user.username.charAt(0).toUpperCase()}

</div>

<div className="customerInfo">

<h4>{user.username}</h4>

<p>{user.email}</p>

</div>

<div className="online">

●

</div>

</div>

))

}

</div>

);

};

export default DashboardCustomers;