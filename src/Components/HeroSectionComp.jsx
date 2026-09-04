import React, { useRef } from 'react'
import "../Styles/herosection.css"
import "../Styles/productscomp.css"
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../Context/WishlistContext";


// ✅ Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { Link } from "react-router-dom";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref } from 'yup';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);




const HeroSectionComp = () => {

const handleWishlist = (item) => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please Login First");
        return;
    }

    addWishlist(item);
}

const { addWishlist, isWishlist } = useWishlist();





 const containerRef = useRef(null);

 const box1Ref = useRef(null);
const box2Ref = useRef(null);
const box3Ref = useRef(null);
const box4Ref = useRef(null);
const box5Ref = useRef(null);
const box6Ref = useRef(null);


const count1Ref = useRef(null);
const count2Ref = useRef(null);
const count3Ref = useRef(null);

useGSAP(() => {
  const boxes = [
    box1Ref.current,
    box2Ref.current,
    box3Ref.current,
    box4Ref.current,
    box5Ref.current,
    box6Ref.current,
  ];

  boxes.forEach((box, index) => {
    if (!box) return;

    gsap.from(box, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        opacity: 0,
        y: 30,
        duration: 2,
        ease: "power2.out",
        delay: index * 0.2,
    });
  });
}, []);





useGSAP(() => {
  const counters = [
    { ref: count1Ref, value: 5 },
    { ref: count2Ref, value: 100 },
    { ref: count3Ref, value: 1000 },
  ];

  counters.forEach((item) => {
    gsap.fromTo(
      item.ref.current,
      { innerText: 0 },
      {
         scrollTrigger: {
          trigger: item.ref.current,
          start: "top 80%",

          toggleActions: "play none none none",
          once: true, // ⭐ MOST IMPORTANT FIX
        },
        innerText: item.value,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },

        scrollTrigger: {
          trigger: item.ref.current,
          // start: "top 80%",
          toggleActions: "play none none reverse",
        },

        onUpdate() {
          item.ref.current.innerText =
            Math.floor(this.targets()[0].innerText).toLocaleString();
        },

        onComplete() {
          item.ref.current.innerText =
            item.value.toLocaleString() + "+";
        },
      }
    );
  });
}, []);



  const swiperSettings = {
  modules: [Navigation],
  navigation: true,
  spaceBetween: 20,
  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
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
console.log(products);

  return (
    <>


      <div className='Displayanimation'>
  

       <div className='Displaypart1'>
         <div ref={containerRef} >
     
        <div ref={box1Ref} className="Fonts1"><h1><b>FIND CLOTHES THAT MATCHES YOUR STYLE</b></h1></div>

        

        <div ref={box2Ref} className='smallfonts'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</div>

<br />

           <div><button ref={box3Ref}  className='shopnow' onClick={()=>navigate("/shoppage")} ><b>Shop Now</b></button></div>
           
           <div className='pricesdiv'>
             <div ref={box4Ref} className='price'>
              <span ref={count1Ref} className='twohundered'>5 +</span> <br />
              <span  className='internationlbrand'>International Brands</span>
            </div>
             <div  ref={box5Ref} className='price'>
              <span ref={count2Ref} className='twohundered'>100 +</span> <br />
              <span  className='internationlbrand'>High-Quality Products</span>
            </div>
             <div ref={box6Ref} className='price'>
              <span ref={count3Ref} className='twohundered'>1000 +</span> <br />
              <span className='internationlbrand'>Happy Customers</span>
            </div>
           </div>
 </div>
       </div>
       <img className='Displayimg' src="Rectangle 2 (2).svg" width="100%" alt="Saifullah" />
      </div>


        <div className='brandnames'>
          
          <p className='names1'>
           <Link to="/brand/versace">VERSACE</Link>
            </p>
          <p className='names2'>
           <Link to="/brand/zara">ZARA</Link>
            </p>
          <p className='names3'>
           <Link to="/brand/gucci">GUCCI</Link>
            </p>
        
          
          <h1 className="names4">
           <Link to="/brand/prada">PRADA</Link>
            </h1>
          <p className='names5'>
           <Link to="/brand/calvin-klein">Calvin Klein</Link>
            </p>
         
        </div>

          <br />
          <br />
         

<div className='combine'>
<div >
    <h1  className="newarrivals">• NEW ARRIVALS</h1>

    <p className="sh">
        Discover our latest products just added to the store.
    </p>
</div>
</div>
        <div className='linebyline'>
        
      
 <div className="products-grid">
  {products.slice(0, 7).map((item) => (

    <div className="product-card" key={item._id}>

      {/* Wishlist */}



<div
 className="heroWishlist"
 onClick={() => handleWishlist(item)}
>
<FaHeart color={ isWishlist(item._id) ? "red" : "#cfcfcf" } /> </div>




      {/* Discount */}

      <div className="discount">
        -20%
      </div>

      {/* Image */}

      <div className="image-box">
        <img src={item.image} alt={item.productName} />
      </div>

      {/* Bottom */}

      <div className="product-info">

        <span className="category">
          {item.category}
        </span>

        <h2 className="product-name">
          {item.productName}
        </h2>

        <p className="description">
          {item.description?.slice(0,60)}...
        </p>

        <div className="rating">
          ⭐⭐⭐⭐⭐
          <span>4.9</span>
        </div>

       <div className="price-box">

  <span className="old-price">
    Rs {item.oldPrice || Math.round(item.price * 1.4)}
  </span>

  <span className="new-price">
    Rs {item.price}
  </span>

  <span className="save-price">
    Save {Math.round(((item.oldPrice || Math.round(item.price * 1.4)) - item.price))}
  </span>

</div>

        <button
        onClick={()=>navigate(`/singlepageproduct/${item._id}`)}
        >
          View Product
        </button>

      </div>

    </div>

  ))}
</div>


                    </div>



      <div className='divbuttonviewall'> <button className='water-btn '  onClick={() => navigate("/Shoppage")} >
      View All
      </button></div>

    <div className='newarrivals'><h1><b><li>Best Selling Products</li></b></h1></div>



        <div className='linebyline'>
      
 <div className="products-grid">
  {products.slice(7, 16).map((item) => (

    <div className="product-card" key={item._id}>

      {/* Wishlist */}

<div
 className="wishlist"
 onClick={() => handleWishlist(item)}
>
<FaHeart color={ isWishlist(item._id) ? "red" : "#cfcfcf" } /> </div>

      {/* Discount */}

      <div className="discount">
        -20%
      </div>

      {/* Image */}

      <div className="image-box">
        <img src={item.image} alt={item.productName} />
      </div>

      {/* Bottom */}

      <div className="product-info">

        <span className="category">
          {item.category}
        </span>

        <h2 className="product-name">
          {item.productName}
        </h2>

        <p className="description">
          {item.description?.slice(0,60)}...
        </p>

        <div className="rating">
          ⭐⭐⭐⭐⭐
          <span>4.9</span>
        </div>

<div className="price-box">

  <span className="old-price">
    Rs {item.oldPrice || Math.round(item.price * 1.4)}
  </span>

  <span className="new-price">
    Rs {item.price}
  </span>

  <span className="save-price">
    Save {Math.round(((item.oldPrice || Math.round(item.price * 1.4)) - item.price))}
  </span>

</div>
        <button
        onClick={()=>navigate(`/singlepageproduct/${item._id}`)}
        >
          View Product
        </button>

      </div>

    </div>

  ))}
</div>




                    </div>


<div className='divbuttonviewall'> <button className='water-btn ' onClick={() => navigate("/Shoppage")}>
  View All
  </button></div>




<div className='displaygrid'>
  <div className='middleboxgrid'>
  <div className='browserbydressstyle'><h1><b>BROWSER BY DRESS SYLE</b></h1></div>
  


  <div className="container">
  <div className="box1"><img src="/Frame 61.png" alt="" /></div>
  <div className="box2"></div>
  <div className="box3"></div>
  <div className="box4"><img src="/Frame 63.png" alt="" /></div>
</div>
</div>
</div>


<div className='happycustomers'><div className='fonts'><h1><b>Our Happy Coustomers</b></h1></div>
<div className='controllsarrow'>
<div className='Arrows'><FaArrowLeft /></div>
<div className='Arrows2'><FaArrowRight /></div></div>
</div>


 <Swiper className="backgroundswiper" {...swiperSettings}>

  <SwiperSlide>
    <div className="ReviewsCard">
      <div className="star">
        <img src="Frame 10.png" alt="" />
      </div>

      <h1 className="heading_review">
        Sarah M. <img src="Vector (1).png" alt="" />
      </h1>

      <div className="paragraph">
        "I'm blown away by the quality and style of the clothes I received from Shop.co.
        From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
      </div>
    </div>
  </SwiperSlide>


  <SwiperSlide>
    <div className="ReviewsCard">
      <div className="star">
        <img src="Frame 10.png" alt="" />
      </div>

      <h1 className="heading_review">
        Alex K. <img src="Vector (1).png" alt="" />
      </h1>

      <div className="paragraph">
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.
        The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
      </div>
    </div>
  </SwiperSlide>


  <SwiperSlide>
    <div className="ReviewsCard">
      <div className="star">
        <img src="Frame 10.png" alt="" />
      </div>

      <h1 className="heading_review">
        James L. <img src="Vector (1).png" alt="" />
      </h1>

      <div className="paragraph">
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.
        The selection of clothes is not only diverse but also on-point with the latest trends."
      </div>
    </div>
  </SwiperSlide>


  <SwiperSlide>
    <div className="ReviewsCard">
      <div className="star">
        <img src="Frame 10.png" alt="" />
      </div>

      <h1 className="heading_review">
        Michael R. <img src="Vector (1).png" alt="" />
      </h1>

      <div className="paragraph">
        "Excellent service and amazing quality. Delivery was fast and the products matched exactly what I expected."
      </div>
    </div>
  </SwiperSlide>


  <SwiperSlide>
    <div className="ReviewsCard">
      <div className="star">
        <img src="Frame 10.png" alt="" />
      </div>

      <h1 className="heading_review">
        Emma T. <img src="Vector (1).png" alt="" />
      </h1>

      <div className="paragraph">
        "The designs are modern, comfortable, and affordable. I will definitely shop here again."
      </div>
    </div>
  </SwiperSlide>

</Swiper>






  













    </>
  )
}

export default HeroSectionComp
