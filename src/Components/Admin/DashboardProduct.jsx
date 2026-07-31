import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/dashboardproduct.css";

const DashBoardProduct = () => {
  const navigate = useNavigate();
  const [deletedCount, setDeletedCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1000/product/all-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.log(err));
  }, []);




  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:1000/product/delete-product/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts((prev) =>
          prev.filter((item) => item._id !== id)
        );
         
         setDeletedCount((prev) => prev + 1);

        alert("Product deleted successfully ✅");
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed ❌");
    }
  };

  

  const handleEdit = (product) => {
    navigate("/adminpanel/shoppingform", {
      state: { product },
    });
  };

  return (
    <>
      <div className="seeingheading">
       <div className="divproductheading"> <h1>SHOP.CO PRODUCTS</h1></div>
         <div className="divproductheading2">
          <p> Current Products: {products.length}</p>
          <p>Total Generated: {products.length + deletedCount}</p>
          <p> Deleted Products: {deletedCount}</p>
         </div>
      </div>

      <div className="productmakerbtnparant">
        <div className="productdesignparant">
          {products.map((product) => (
            <div key={product._id} className="SaveCard">
              <img
                className="Imgboxproduct"
                src={product.image}
                alt={product.name}
                width="150"
              />

              <div className="deleteoptionparant">
                <div className="titlediv">
                  <h3>{product.name}</h3>
                </div>

                <div className="titlediv2">
                  <p>{product.description}</p>
                </div>

                <div className="titleRupees">
                  <p>Rs {product.price}</p>
                </div>

                <div className="deletechangebtn">
                  <button
                    className="deletebtn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="changebtn"
                    onClick={() => handleEdit(product)}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="productmakerbtn"
          onClick={() => navigate("/adminpanel/shoppingform")}
        >
          Create Product{" "}
          <span>
            <FaPlus />
          </span>
        </div>
      </div>
    </>
  );
};

export default DashBoardProduct;