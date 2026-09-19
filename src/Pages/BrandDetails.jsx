import React from "react";
import { Navigate, useParams } from "react-router-dom";
import "../Styles/BrandDetails.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import {useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaEye,
  FaStar,
} from "react-icons/fa";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWishlist } from "../Context/WishlistContext";
gsap.registerPlugin(ScrollTrigger);








const brandData = {
  zara: {
    name: "ZARA",
    banner:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600",
    description:
      "Zara is one of the world's leading fashion brands offering modern clothing, footwear and accessories for men, women and kids.",
    founded: "1975",
    country: "Spain",
    products: "120+",
    rating: "4.9",
  },

  gucci: {
    name: "GUCCI",
    banner:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600",
    description:
      "Gucci is an Italian luxury fashion house famous for premium clothing, handbags, shoes and accessories.",
    founded: "1921",
    country: "Italy",
    products: "80+",
    rating: "4.8",
  },

  prada: {
    name: "PRADA",
    banner:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600",
    description:
      "Prada creates timeless luxury collections with premium quality and elegant design.",
    founded: "1913",
    country: "Italy",
    products: "65+",
    rating: "4.8",
  },

  versace: {
    name: "VERSACE",
    banner:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
    description:
      "Versace represents bold luxury, premium fashion and iconic Italian craftsmanship.",
    founded: "1978",
    country: "Italy",
    products: "50+",
    rating: "4.7",
  },

  "calvin-klein": {
    name: "CALVIN KLEIN",
    banner:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600",
    description:
      "Calvin Klein is known worldwide for minimalist fashion, denim and premium lifestyle products.",
    founded: "1968",
    country: "USA",
    products: "95+",
    rating: "4.8",
  },
};

const BrandDetails = () => {
    const navigate = useNavigate();
  const { brandName } = useParams();

  const brand = brandData[brandName];

  if (!brand) {
    return (
      <h1 style={{ textAlign: "center", margin: "100px" }}>
        Brand Not Found
      </h1>
    );
  }



const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://sk-store-theta.vercel.app/product/all-products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
    })
    .catch((err) => console.log(err));
}, []);





const newsletterRef = useRef(null);
useEffect(() => {

  gsap.from(heroRef.current,{

      opacity:0,

      y:100,

      duration:1.2

  });

  gsap.from(infoRef.current,{

      scrollTrigger:infoRef.current,

      opacity:0,

      y:80,

      duration:1

  });

  gsap.from(productRef.current,{

      scrollTrigger:productRef.current,

      opacity:0,

      y:100,

      duration:1

  });

  gsap.from(reviewRef.current,{

      scrollTrigger:reviewRef.current,

      opacity:0,

      y:100,

      duration:1

  });


  gsap.from(".product-card",{

scrollTrigger:".products-grid",

opacity:0,

y:80,

duration:.8,

stagger:.2

});

gsap.from(".info-card",{

scrollTrigger:".brand-info",

scale:.5,

opacity:0,

duration:.8,

stagger:.2

});
gsap.from(newsletterRef.current,{

scrollTrigger:newsletterRef.current,

opacity:0,

scale:.8,

duration:1

});

},[]);






const { addToCart } = useCart();
const {addToWishlist}=useWishlist();
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [sortBy, setSortBy] = useState("Latest");





let filteredProducts = products.filter((item) => {

  // Brand Filter
  const matchBrand =
    item.brand &&
    item.brand.toLowerCase().replace(/\s+/g, "-") === brandName;

  // Search Filter
 const matchSearch =
(item.title || "")
  .toLowerCase()
  .includes(search.toLowerCase());

  // Category Filter
  const matchCategory =
    category === "All" ||
    item.category === category;

  return matchBrand && matchSearch && matchCategory;

});
if (sortBy === "Price Low") {

  filteredProducts.sort((a, b) => a.price - b.price);

}

if (sortBy === "Price High") {

  filteredProducts.sort((a, b) => b.price - a.price);

}



















const heroRef = useRef(null);
const infoRef = useRef(null);
const productRef = useRef(null);
const reviewRef = useRef(null);











  return (
    <div className="brand-details">

      <section
        className="brand-banner"
        style={{
          backgroundImage: `url(${brand.banner})`,
        }}
      >




        <section
ref={heroRef}
className="brand-banner"
></section>





        <div className="banner-overlay">
          <h1>{brand.name}</h1>

          <p>{brand.description}</p>

          <button onClick={() => navigate("/Shoppage")}>Shop Collection</button>
        </div>
      </section>









<section
    ref={infoRef}
    className="brand-info"
>
        <div className="info-card">
          <h2>{brand.products}</h2>
          <span>Products</span>
        </div>

        <div className="info-card">
          <h2>{brand.rating}</h2>
          <span>Rating</span>
        </div>

        <div className="info-card">
          <h2>{brand.country}</h2>
          <span>Country</span>
        </div>

        <div className="info-card">
          <h2>{brand.founded}</h2>
          <span>Founded</span>
        </div>
</section>





      








      <section className="about-brand">

        <h2>About {brand.name}</h2>

        <p>{brand.description}</p>

      </section>






<section className="brand-category">

    <h2>Shop By Category</h2>

    <div className="category-grid">

        <div className="category-card">
            <span>👔</span>
            <h3>Men</h3>
        </div>

        <div className="category-card">
            <span>👗</span>
            <h3>Women</h3>
        </div>

        <div className="category-card">
            <span>👟</span>
            <h3>Shoes</h3>
        </div>

        <div className="category-card">
            <span>⌚</span>
            <h3>Accessories</h3>
        </div>

    </div>

</section>

















<section className="product-toolbar">

    <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
    >

        <option>All</option>
        <option>Men</option>
        <option>Women</option>
        <option>Shoes</option>
        <option>Accessories</option>

    </select>

    <select
        value={sortBy}
        onChange={(e)=>setSortBy(e.target.value)}
    >

        <option>Latest</option>

        <option>Price Low</option>

        <option>Price High</option>

    </select>

</section>















<section className="brand-products">
    <section
ref={productRef}
className="brand-products"
></section>

  <h2>Featured Products</h2>

  <div className="products-grid">

    {filteredProducts.length > 0 ? (

      filteredProducts.map((item) => (

        <div className="product-card" key={item._id}>

          <div className="product-image">

            <img
              src={item.image}
              alt={item.title}
            />

            <span className="discount">
              -20%
            </span>

            <button className="wishlist-btn">
              <FaRegHeart />
            </button>

          </div>

          <div className="product-content">

            <h3>{item.title}</h3>

            <div className="rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="price">
              ${item.price}
            </p>

            <div className="product-buttons">

              <button
                onClick={() => addToCart(item)}
              >
                Add To Cart
              </button>

              <Link to={`/singlepageproduct/${item._id}`}>
                <button>
                  <FaEye />
                </button>
              </Link>

            </div>

          </div>

        </div>

      ))

    ) : (

      <h2
        style={{
          textAlign: "center",
          padding: "80px",
          width: "100%"
        }}
      >
        No Products Found
      </h2>

    )}

  </div>

</section>







<section className="reviews">

    <section
ref={reviewRef}
className="reviews"
></section>

<h2>Customer Reviews</h2>

<div className="review-grid">

<div className="review-card">

★★★★★

<p>
Amazing quality and premium products.
</p>

<h4>John Smith</h4>

</div>

<div className="review-card">

★★★★★

<p>
Fast shipping and beautiful packaging.
</p>

<h4>Sarah Wilson</h4>

</div>

<div className="review-card">

★★★★★

<p>
One of my favorite fashion brands.
</p>

<h4>Michael Lee</h4>

</div>

</div>

</section>







<section className="similar-brands">

<h2>Explore More Brands</h2>

<div className="similar-grid">

<Link to="/brand/zara">ZARA</Link>

<Link to="/brand/gucci">GUCCI</Link>

<Link to="/brand/prada">PRADA</Link>

<Link to="/brand/versace">VERSACE</Link>

<Link to="/brand/calvin-klein">CALVIN KLEIN</Link>

</div>

</section>








<section className="newsletter">

    <section
ref={newsletterRef}
className="newsletter"
></section>

<h2>Stay Updated</h2>

<p>
Subscribe for the latest collections and exclusive offers.
</p>

<div className="newsletter-box">

<input
type="email"
placeholder="Enter your email"
/>

<button>
Subscribe
</button>

</div>

</section>

















    </div>
  );
};

export default BrandDetails;