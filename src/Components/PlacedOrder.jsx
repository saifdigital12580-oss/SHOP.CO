import React, { useEffect, useState } from "react";
import "../Styles/placedorder.css"

const PlacedOrder = () => {

    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        fetch("https://shop-cobackend.onrender.com/order/all-orders")
        .then(res=>res.json())
        .then(data=>{
            setOrders(data.orders);
        })

    },[]);

   return (
  <div className="placed-orders">

    <h1>Placed Orders</h1>

    {orders.map((order) => (

      <div className="order-card" key={order._id}>

        <h3>Order #{order._id.slice(-6)}</h3>

        <p>Name: {order.customerName}</p>
        <p>Phone: {order.phone}</p>
        <p>City: {order.city}</p>

        <div className="products-section">

          <h3>Ordered Products</h3>

          {order.products?.map((item,index)=>(
            <div className="product-item" key={index}>

              <img
                src={item.image}
                alt={item.title}
                className="product-img"
              />

              <div className="product-info">

                <h4>{item.title}</h4>

                <p>Price : Rs {item.price}</p>

                <p>Quantity : {item.quantity}</p>

                <p>Total : Rs {item.price * item.quantity}</p>

              </div>

            </div>
          ))}

          <div className="grand-total">
            Grand Total : Rs {order.totalPrice}
          </div>

        </div>

      </div>

    ))}

  </div>
);

}

export default PlacedOrder;