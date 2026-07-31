// Pages/CartPage.jsx
import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "../Styles/cart.css";


const CartPage = () => {
  // const { cartItems } = useCart();
  
  const navigate = useNavigate();
// const { cartItems, removeFromCart } = useCart();
const {
  cartItems,
  removeFromCart,
  increaseQty,
  decreaseQty,
  totalPrice,
} = useCart();




// const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Do you want to delete this product?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:1000/product/delete-product/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setProducts((prev) =>
//           prev.filter((item) => item._id !== id)
//         );
         
//          setDeletedCount((prev) => prev + 1);

//         alert("Product deleted successfully ✅");
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Delete failed ❌");
//     }
//   };








  return (
   <div className="cartContainer">

  <div className="cartLeft">

    {cartItems.map((item) => (
      <div className="cartCard" key={item._id}>

        <img src={item.image} alt={item.name} className="cartImg" />

        <div className="cartInfo">
          <h2>{item.name}</h2>

          <p>{item.description}</p>

          <h3>Rs {item.price}</h3>

          <div className="qtyBox">
            <button
              className="qtyBtn"
              onClick={() => decreaseQty(item._id)}
            >
              -
            </button>

            <span className="qtyNumber">
              {item.quantity}
            </span>

            <button
              className="qtyBtn"
              onClick={() => increaseQty(item._id)}
            >
              +
            </button>
          </div>

          <button
            className="deleteBtn"
            onClick={() => removeFromCart(item._id)}
          >
            Delete
          </button>

        </div>

      </div>
    ))}

  </div>

  <div className="cartRight">

    <h2>Order Summary</h2>

    <div className="summaryRow">
      <span>Subtotal</span>
      <span>Rs {totalPrice}</span>
    </div>

    <div className="summaryRow">
      <span>Shipping</span>
      <span>Free</span>
    </div>

    <hr />

    <div className="summaryRow total">
      <span>Total</span>
      <span>Rs {totalPrice}</span>
    </div>

    <button className="checkoutBtn" onClick={() => navigate("/ProceedToCheckout")}>
      Proceed to Checkout
    </button>

  </div>

</div>
  );
};

export default CartPage;