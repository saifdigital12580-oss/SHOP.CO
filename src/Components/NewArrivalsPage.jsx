import React, { useEffect, useState } from "react";
// import "../Styles/productscomp.css";
import "../Styles/newarrivals.css";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../Context/WishlistContext";



const NewArrivalsPage = () => {
const { addWishlist, isWishlist } = useWishlist();

const handleWishlist = (item) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please Login First");
    return;
  }

  addWishlist(item);
};




    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await fetch(
                    "https://shop-cobackend.onrender.com/product/all-products"
                );

                const data = await response.json();

                setProducts(data.products);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        getProducts();

    }, []);

    return (

        <div className="new-arrivals-page">

            {/* Hero Banner */}

            <section className="arrival-banner">

                <div className="banner-left">

                    <span className="small-title">
                        NEW COLLECTION 2026
                    </span>

                    <h1>
                        New Arrivals
                    </h1>

                    <p>

                        Discover premium quality fashion products
                        carefully selected for your everyday lifestyle.

                    </p>

                    <button
                        onClick={() => navigate("/shoppage")}
                    >
                        Shop Collection
                    </button>

                </div>

                <div className="banner-right">

                    <img
                        src="https://th.bing.com/th/id/R.05fc4f2da3f8a04e4dac109f3b9682d8?rik=DovEJTn5gnxTlg&pid=ImgRaw&r=0"
                        alt="banner"
                    />

                </div>

            </section>

            {/* Title */}

            <div className="arrival-heading">

                <h1>Latest Products</h1>

                <p>

                    Fresh products added by our admin.

                </p>

            </div>

            {/* Products */}

            <div className="products-grid">

                {
                    loading ?

                        <h2>Loading Products...</h2>

                        :

                        products.map((item) => (

                            <div
                                className="product-card"
                                key={item._id}
                            >

 <div
  className="arrivalWishlist"
  onClick={() => handleWishlist(item)}
>
  <FaHeart
    color={isWishlist(item._id) ? "red" : "#cfcfcf"}
    size={22}
  />
</div>

<div className="discountcard">
  -{item.discount || 20}%
</div>

                                <div className="image-box">

                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                    />

                                </div>

                                <div className="product-infocard">

                                    <span className="category">
                                        {item.category}
                                    </span>

                                    <h2 className="product-namecard">
                                        {item.name}
                                    </h2>

                                    <p className="descriptioncard">

                                        {item.description?.slice(0,60)}...

                                    </p>

                                    <div className="ratingcard">

                                        ⭐⭐⭐⭐⭐

                                        <span className="ratingspan">5.0</span>

                                    </div>

                                    <div className="price-boxcard">

                                        <span className="new-price">

                                            Rs {item.price}

                                        </span>

                                        <span className="old-price">

                                            Rs {item.oldPrice || item.price + 500}

                                        </span>

                                    </div>

                                    <button

                                    onClick={() =>

                                    navigate(`/singlepageproduct/${item._id}`)

                                    }

                                    >

                                        View Product

                                    </button>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

};

export default NewArrivalsPage;