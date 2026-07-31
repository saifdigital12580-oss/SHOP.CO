import React, { useState } from "react";
import "../Styles/proceedtocheckout.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTruck,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaLock,
  FaCheck
} from "react-icons/fa";







const ProceedToCheckout = () => {
const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place Order
  const handlePlaceOrder = async () => {

    if (
      !formData.name ||
      !formData.phone ||
      !formData.city ||
      !formData.address
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:1000/order/place-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customerName: formData.name,
            phone: formData.phone,
            city: formData.city,
            address: formData.address,
            notes: formData.notes,

            products: cartItems,

            totalPrice,
          }),
        }
      );

      const data = await response.json();

  if (data.success) {
  alert("🎉 Product Placed Successfully!");

  clearCart();

  navigate("/placedorders");
} else {
  alert(data.message);
}

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };


  return (
    <div className="checkout_container">

      <div className="checkout_wrapper">

        {/* LEFT */}

        <div className="checkout_left">

          <h2>Delivery Information</h2>

          <div className="input_group">

            <label>Full Name</label>

            <div className="input_box">
              <FaUser/>
              <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              />
            </div>

          </div>


          <div className="input_group">

            <label>Mobile Number</label>

            <div className="input_box">
              <FaPhoneAlt/>
              <input
              type="text"
              placeholder="03001234567"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              />
            </div>

          </div>


          <div className="input_group">

            <label>City</label>

            <div className="input_box">
              <FaMapMarkerAlt/>
              <input
              type="text"
              placeholder="Karachi, Lahore..."
              name="city"
              value={formData.city}
              onChange={handleChange}
              />
            </div>

          </div>


          <div className="input_group">

            <label>Complete Address</label>

            <textarea
            rows="4"
            placeholder="House No, Street..."
            name="address"
            value={formData.address}
            onChange={handleChange}
            />

          </div>


          <div className="input_group">

            <label>Delivery Notes</label>

            <input
            type="text"
            placeholder="Optional"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            />

          </div>


          <div className="shipping_cards">

            <div className="ship_card">
              <FaTruck/>
              <div>
                <h4>Shipping Method</h4>
                <p>Free Cash On Delivery</p>
              </div>
            </div>

            <div className="ship_card">
              <FaClock/>
              <div>
                <h4>Estimated Delivery</h4>
                <p>2-3 Days</p>
              </div>
            </div>

            <div className="ship_card full">
              <FaShieldAlt/>
              <div>
                <h4>Checking Warranty</h4>
                <p>Open Package Before Payment</p>
              </div>
            </div>

          </div>

<button
  className="confirm_btn"
  onClick={handlePlaceOrder}
  
>
  <FaCheck />
  Confirm Order - Cash On Delivery (Rs {totalPrice})
</button>
        </div>















        {/* RIGHT */}

        <div className="checkout_right">

          <h2>Order Summary</h2>


        {cartItems.map((item) => (
       <div className="product" key={item._id || item.id}>
         <img src={item.image} alt={item.title} />
     
         <div>
           <h3>{item.title}</h3>
     
           <p>
             Rs {item.price} × {item.quantity}
           </p>
         </div>
       </div>
       ))}

          <hr />

<div className="price_row">
  <span>Subtotal</span>
  <strong>Rs {totalPrice}</strong>
</div>

<div className="price_row">
  <span>Shipping</span>
  <strong className=" green">FREE</strong>
</div>

<div className="price_row total">
  <span>Total Amount</span>
  <strong>Rs {totalPrice}</strong>
</div>

          <div className="info_box">
            <FaTruck/>
            <div>
              <h4>Free Shipping Pakistan Wide</h4>
              <p>Nationwide Delivery</p>
            </div>
          </div>

          <div className="info_box">
            <FaMoneyBillWave/>
            <div>
              <h4>Cash On Delivery</h4>
              <p>No Advance Payment</p>
            </div>
          </div>

          <div className="info_box">
            <FaClock/>
            <div>
              <h4>Delivery in 2-3 Days</h4>
              <p>Fast Shipping</p>
            </div>
          </div>

          <div className="info_box">
            <FaShieldAlt/>
            <div>
              <h4>Warranty Available</h4>
              <p>Open Before Payment</p>
            </div>
          </div>

          <div className="info_box">
            <FaLock/>
            <div>
              <h4>100% Secure Checkout</h4>
              <p>Your data is encrypted</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProceedToCheckout;