import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";


import { LuLogIn, LuLogOut } from "react-icons/lu";


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/HeaderComp.css";
import { useCart } from "../Context/CartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { useWishlist } from "../Context/WishlistContext";
import { FaHeart } from "react-icons/fa";








const HeaderComp = () => {
const [showWishlist, setShowWishlist] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

const {
  wishlist,
  removeWishlist,
} = useWishlist();




const [orders, setOrders] = useState([]);
const [role, setRole] = useState(localStorage.getItem("role"));
useEffect(() => {
  const handleStorage = () => {
    setRole(localStorage.getItem("role"));
  };

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}, []);

useEffect(() => {
    fetch("https://shop-cobackend.onrender.com/order/all-orders")
      .then(res => res.json())
      .then(data => setOrders(data.orders));
}, []);






const { cartItems, totalItems } = useCart();
  // const { cartItems } = useCart();
  const navigate = useNavigate();

  // ================= SEARCH FUNCTIONALITY =================

const [searchQuery, setSearchQuery] = useState("");
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

const location = useLocation();

const handleSearch = (e) => {
  e.preventDefault();

  const searchValue = searchQuery.trim();

  if (!searchValue) return;

  // Search ke baad Shop page par bhejo
  navigate(`/shoppage?search=${encodeURIComponent(searchValue)}`);

  // Mobile search bar close
  setMobileSearchOpen(false);
};




  const [showLogin, setShowLogin] = useState(
    !!localStorage.getItem("login")
  );

  const [showCart, setShowCart] = useState(false);

 async function handleLogout() {
  const confirmDelete = window.confirm(
      "Do you want to Logout from SHOP.CO ?"
    );

    if (!confirmDelete) return;
  console.log("Logout clicked");

  try {
    const response = await fetch("https://shop-cobackend.onrender.com/auth/logout-user", {
      method: "POST",
      credentials: "include",
    });

    console.log("Status:", response.status);

    if (response.ok) {
      localStorage.clear();
      setShowLogin(false);
      alert("Logout Success");
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
}


const closeMobileMenu = () => {
  setMenuOpen(false);
};
  return (
    <>
      <div className="Topbar">
        Sign up and get 20% off to your first order.
        <u className="cursorpointer" onClick={() => navigate("/login")}>  Sign Up Now</u>
      </div>

      <div className="Header">

 <div className="logo_box">
  <div
    className="threelines"
    onClick={() => setMenuOpen(true)}
  >
    <VscThreeBars />
  </div>

  <div
    className="logo"
    onClick={() => navigate("/")}
  >
    SHOP.CO
  </div>

</div>

        <div className="pages_bar">
          <div className="ShopNavegate" onClick={() => navigate("/shoppage")}>
            Shop <FaAngleDown  />
          </div>

          {/* <div className="ShopNavegate">On Sale</div> */}



          <div className="ShopNavegate"  onClick={() => navigate("/new-arrivals")}>
            New Arrivals
            </div>




          <div className="ShopNavegate">
           <Link to="/brands">Brands</Link>
            </div>

        {/* ================= DESKTOP SEARCH ================= */}

<form className="search-box" onSubmit={handleSearch}>

  <button type="submit" className="search_icon">
    <IoSearch size={22} />
  </button>

  <input
    type="text"
    placeholder="Search products..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

</form>
        </div>








        <div className="shoping-login_bar">
  {showLogin ? (
    <>
      <div className="logicon" onClick={() => handleLogout()}>
        <LuLogOut size={16} /> LOGOUT
      </div>

      {role === "admin" && (
  <div className="accounticon">
    <MdOutlineAccountCircle
      size={24}
      onClick={() => navigate("/adminpanel")}
      style={{ cursor: "pointer" }}
    />
  </div>
)}
{showLogin && role === "user" && (
  <div
    className="accounticon"
    onClick={() => navigate("/profile")}
  >
    <FaUserCircle size={24} />
  </div>
)}
    </>
  ) : (
    <div className="logicon"  onClick={() => navigate("/register")}>
      <LuLogIn size={16} />
      LOGIN NOW
    </div>
  )}




 <div className="cartIconordersIcon" onClick={() => navigate("/placedorders")}>

   <MdAddShoppingCart size={25} />

   <span className="cartBadge">
      {orders.length}
   </span>

</div>



























<div
className="wishlistIcon"
onClick={()=>setShowWishlist(true)}
>

<FaHeart size={23} color="crimson"/>

{
wishlist.length>0 &&

<span className="cartBadge">

{wishlist.length}

</span>

}

</div>

{
showWishlist &&

<>

<div

className="wishlistOverlay"

onClick={()=>setShowWishlist(false)}

></div>

<div className="wishlistDrawer">

<div className="cartHeader">

<h2>❤️ Wishlist</h2>

<button

className="closeBtn"

onClick={()=>setShowWishlist(false)}

>

✕

</button>

</div>

<div className="cartBody">

{

wishlist.length===0 ?

<div className="emptyCart">

<h3>No Wishlist</h3>

<p>Add products you like.</p>

</div>

:

wishlist.map((item)=>(

<div
className="cartProduct"
key={item._id}
>

<img

src={item.productId.image}

alt=""

/>

<div className="cartDetails">

<h4>

{item.productId.productName}

</h4>

<p>

Rs {item.productId.price}

</p>

<div
style={{
display:"flex",
gap:"10px",
marginTop:"10px"
}}
>

<button

className="viewBtn"

onClick={()=>{

setShowWishlist(false);

navigate(`/singlepageproduct/${item.productId._id}`);

}}

>

View

</button>

<button

className="removeBtn"

onClick={()=>removeWishlist(item._id)}

>

Remove

</button>

</div>

</div>

</div>

))

}

</div>

{

wishlist.length>0 &&

<div className="cartFooter">

<button

className="checkoutBtn"

onClick={()=>{

setShowWishlist(false);

navigate("/wishlist");

}}

>

Open Wishlist

</button>

</div>

}

</div>

</>

}

























{/* ================= MOBILE SEARCH ICON ================= */}

<button
  type="button"
  className="search1"
  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
  aria-label="Open product search"
>
  <IoSearch size={16} />
</button>



 <div className="cartBox">
 <div className="cartIcon" onClick={() => setShowCart(true)}>
  <FiShoppingCart size={25} />

  {totalItems > 0 && (
    <span className="cartBadge">
      {totalItems}
    </span>
  )}
</div>

  {/* Overlay */}
  {showCart && (
    <>
      <div
        className="cartOverlay"
        onClick={() => setShowCart(false)}
      ></div>

      {/* Drawer */}
      <div className="cartDrawer">
        <div className="cartHeader">
          <h2>Shopping Cart</h2>

          <button
            className="closeBtn"
            onClick={() => setShowCart(false)}
          >
            ✕
          </button>
        </div>

        <div className="cartBody">
          {cartItems.length === 0 ? (
            <div className="emptyCart">
              <h3>Your Cart is Empty</h3>
              <p>Add some products to continue shopping.</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="cartProduct" key={item._id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cartDetails">
                    <h4>{item.name}</h4>
                    <p>Rs {item.price}</p>
                    <small>Qty : {item.quantity || 1}</small>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cartFooter">
            <button
              className="checkoutBtn"
              onClick={() => {
                setShowCart(false);
                navigate("/CartPage");
              }}
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>
</div>
        
      </div>




{/* ================= MOBILE SEARCH BAR ================= */}

<div
  className={`mobile-search-panel ${
    mobileSearchOpen ? "mobile-search-visible" : ""
  }`}
>

  <form className="mobile-search-form" onSubmit={handleSearch}>

    <IoSearch className="mobile-search-icon" size={22} />

    <input
      type="text"
      placeholder="Search your favourite products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus={mobileSearchOpen}
    />

    {searchQuery && (
      <button
        type="button"
        className="mobile-search-clear"
        onClick={() => setSearchQuery("")}
      >
        ✕
      </button>
    )}

    <button
      type="submit"
      className="mobile-search-submit"
      disabled={!searchQuery.trim()}
    >
      Search
    </button>

  </form>

</div>








{/* ================= MOBILE MENU ================= */}

<div
  className={`mobile-nav ${menuOpen ? "show" : "hidenav"}`}
>

  <button
    className="mobile-close"
    onClick={closeMobileMenu}
  >
    ✕
  </button>

  <div className="mobile-menu-logo">
    SHOP.CO
  </div>

  <div className="mobile-menu-links">

    <div
      className="mobile-link"
      onClick={() => {
        closeMobileMenu();
        navigate("/shoppage");
      }}
    >
      <span>Shop</span>
      <FaAngleDown />
    </div>


    <div
      className="mobile-link"
      onClick={() => {
        closeMobileMenu();
        navigate("/new-arrivals");
      }}
    >
      <span>New Arrivals</span>
    </div>


    <Link
      to="/brands"
      className="mobile-link"
      onClick={closeMobileMenu}
    >
      <span>Brands</span>
    </Link>

  </div>

</div>


{/* MOBILE MENU BACKGROUND */}

{menuOpen && (
  <div
    className="mobile-menu-overlay"
    onClick={closeMobileMenu}
  ></div>
)}




    </>
  );
};

export default HeaderComp;