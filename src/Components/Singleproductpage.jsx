import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/singleproductpage.css";
import { useCart } from "../Context/CartContext";

const Singleproductpage = () => {

const [added, setAdded] = useState(false);
  // const { addToCart } = useCart();
  const { id } = useParams();
const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();


  const handleAddToCart = () => {
  addToCart(product);
  setAdded(true);
};


const alreadyAdded = cartItems.some(
  (item) => item._id === product?._id
);



  useEffect(() => {
    fetch(`https://sk-store-theta.vercel.app/product/single-product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className="bar1">
        Home &gt; Shop &gt; {product.name}
      </div>

      <div className="singleproductview">

        {/* Left Box */}
        <div className="singleproductview1">
          <img
            src={product.image}
            alt={product.name}
            className="singleImage"
          />
        </div>

        {/* Right Box */}
        <div className="singleproductview2">
          <h1>{product.name}</h1>

          <h2>Rs {product.price}</h2>

          <p>{product.description}</p>

          <button className="buyBtn" onClick={() => addToCart(product , "buy")}>
            Buy Now
          </button>

           <button  
             className="addBtn"
             onClick={() => addToCart(product , "add")}
             disabled={alreadyAdded}
           >
             {alreadyAdded ? "Added Complete ✅" : "Add To Cart"}
           </button>
        </div>

      </div>
    </>
  );
};

export default Singleproductpage;