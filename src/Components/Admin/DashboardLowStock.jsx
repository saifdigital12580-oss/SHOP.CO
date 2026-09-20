import React, { useEffect, useState } from "react";
import "../../Styles/dashboardlowstock.css";

const DashboardLowStock = () => {

const [products,setProducts]=useState([]);

useEffect(()=>{

fetchProducts();

},[]);

const fetchProducts=async()=>{

const response=await fetch(
"https://shop-cobackend.onrender.com/dashboard/low-stock"
);

const data=await response.json();

if(data.success){

setProducts(data.products);

}

};

return(

<div className="lowStockCard">

<h2>⚠ Low Stock Products</h2>

{
products.length===0?

<p className="allGood">
✅ All Products Have Healthy Stock
</p>

:

products.map((item)=>(

<div
className="stockItem"
key={item._id}
>

<img
src={item.image}
alt=""
/>

<div className="stockInfo">

<h4>{item.name}</h4>

<p>

Stock :

<span>

{item.stock}

</span>

</p>

</div>

</div>

))

}

</div>

);

};

export default DashboardLowStock;