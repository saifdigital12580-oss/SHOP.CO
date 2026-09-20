import React from 'react'
import "../Styles/shoppage.css"
import "../Styles/productscomp.css"
import { TbFilter2Cog } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { GiLargeDress } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../Context/CartContext";
  
const Shoppage = () => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(true);

const [colorOpen, setColorOpen] = useState(false);
const [sizeOpen, setSizeOpen] = useState(false);
const [dressOpen, setDressOpen] = useState(false);

const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [selectedDress, setSelectedDress] = useState("");



const [products, setProducts] = useState([]);  
const [search, setSearch] = useState("");
const [maxPrice, setMaxPrice] = useState(250000);
const [sortBy, setSortBy] = useState("Default");
const [selectedCategory, setSelectedCategory] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const filteredProducts = products.filter((product) => {

  const matchSearch =
    (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchCategory =
    selectedCategory === "All" ||
    (product.category || "")
      .toLowerCase() === selectedCategory.toLowerCase();

  const matchPrice =
    product.price <= maxPrice;

  return (
    matchSearch &&
    matchCategory &&
    matchPrice
  );

});
let sortedProducts = [...filteredProducts];

if (sortBy === "Low") {
  sortedProducts.sort((a, b) => a.price - b.price);
}

if (sortBy === "High") {
  sortedProducts.sort((a, b) => b.price - a.price);
}

if (sortBy === "AZ") {
  sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
}

if (sortBy === "ZA") {
  sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
}
const productsPerPage = 6;

const lastIndex = currentPage * productsPerPage;
const firstIndex = lastIndex - productsPerPage;

const currentProducts = sortedProducts.slice(
  firstIndex,
  lastIndex
);

const totalPages = Math.ceil(
  sortedProducts.length / productsPerPage
);








const [loading, setLoading] = useState(true);
const [gridView,setGridView]=useState(true);













const navigate = useNavigate();




useEffect(() => {
  fetch("https://shop-cobackend.onrender.com/product/all-products")
    .then((res) => {
      console.log(res.status);
      return res.json();
    })
    .then((data) => {
      console.log(data);

      setProducts(data.products);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}, []);

// ================= FILTER SECTION COMPONENT =================

const FilterSection = ({
  title,
  icon,
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <div className="smallFilterBox">

      <div
        className="smallFilterHeader"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>
          {title}
          {icon}
        </h3>

        {isOpen ? (
          <FaChevronUp />
        ) : (
          <FaChevronDown />
        )}
      </div>

      {isOpen && (
        <div className="smallFilterBody">
          {children}
        </div>
      )}

    </div>
  );
};




if (loading) {
  return (
    <div className="loaderBox">
      <div className="loader"></div>
      <h2>Loading Products...</h2>
    </div>
  );
}


  return (
    <>
      <div className='bar1'>Home &gt; Casual</div>


<div className="shopSearchBox">
    <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>





      <div className='bigbox'>
        <div className='Filtersbigbox'>
          <div className='filterheading'>Filters<TbFilter2Cog /></div>
          <div className='productcategoriesbox'>



<div
className={`categoryItem ${
selectedCategory==="Watches"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("Watches")}
>

Watches

<IoIosArrowForward/>

</div>







<div
className={`categoryItem ${
selectedCategory==="T-shirts"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("T-shirts")}
>

T-shirts

<IoIosArrowForward/>

</div>







<div
className={`categoryItem ${
selectedCategory==="Shorts"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("Shorts")}
>

Shorts

<IoIosArrowForward/>

</div>





<div
className={`categoryItem ${
selectedCategory==="Hoodies"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("Hoodies")}
>

Hoodies

<IoIosArrowForward/>

</div>





<div
className={`categoryItem ${
selectedCategory==="Jeans"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("Jeans")}
>

Jeans

<IoIosArrowForward/>

</div>



<div
className={`categoryItem ${
selectedCategory==="Clothes"
?
"activeCategory"
:
""
}`}
onClick={()=>
setSelectedCategory("Clothes")}
>

Clothes

<IoIosArrowForward/>

</div>




<div
  className="procateboxchild4"
  onClick={() => setSelectedCategory("All")}
>
  All Products
  <IoIosArrowForward />
</div>
 </div>



<button
className="clearBtn"
onClick={()=>{
setSearch("");
setSelectedCategory("All");
setSelectedSize("");
setMaxPrice(250000);
setSortBy("Default");
}}
>

Clear Filters

</button>





           <div className='pricewetype'>
            <div className="priceFilter">
            <div className="filterHeader" onClick={() => setOpen(!open)} >
              <h2>Price</h2>
      
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </div>
      
            {open && (
              <div className="filterBody">
               <input
                type="range"
                min="0"
                max="250000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
      
               <div className="priceLabels">
                <span>$0</span>
                <span>${maxPrice}</span>
              </div>
              </div>
            )}
      </div>

         </div>







           <div className='filterparantcolor'>
           <div className="filterBox">
            <div
              className="filterHeader"
              onClick={() => setColorOpen(!colorOpen)}
            >
              <h2>Colors</h2>
              <span>{colorOpen ? "⌃" : "⌄"}</span>
            </div>
          
            {colorOpen && (
              <div className="colorContainer">
                <div className="color red"></div>
                <div className="color blue"></div>
                <div className="color green"></div>
                <div className="color yellow"></div>
                <div className="color purple"></div>
                <div className="color black"></div>
              </div>
            )}
          </div>
           </div>



         <div className='filterparantcolor'>
         <div className="filterBox">
         <div
           className="filterHeader"
           onClick={() => setSizeOpen(!sizeOpen)}
         >
           <h2>Size</h2>
           <span>{sizeOpen ? "⌃" : "⌄"}</span>
         </div>
       
         {sizeOpen && (
           <div className="sizeContainer">
             {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
               <button
                 key={size}
                 className={`sizeBtn ${
                   selectedSize === size ? "active" : ""
                 }`}
                 onClick={() => setSelectedSize(size)}
               >
                 {size}
               </button>
             ))}
           </div>
         )}
       </div>
      </div>


   

   <div className='Dressparantdiv'>
         <div className='dresshead'>Dress Style<GiLargeDress /></div>
          <div className='dresscateboxchild1'>Casual<MdKeyboardArrowRight /></div>
         <div className='dresscateboxchild2'>Formal<MdKeyboardArrowRight /></div>
         <div className='dresscateboxchild3'>Party<MdKeyboardArrowRight /></div>
         <div className='dresscateboxchild4'>Gym<MdKeyboardArrowRight /></div>
   </div>
  






        </div>
        
       












        <div className='Productsbigbox'>

                    <div className='firstdiv'>
                      <div className='firstdiv1'>Casual</div>

 <div className="firstdiv2">

  <span>
    Showing {filteredProducts.length} Products
  </span>

  <select className='searchletters'
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="Default">Most Popular</option>
    <option value="Low">Price: Low → High</option>
    <option value="High">Price: High → Low</option>
    <option value="AZ">Name: A → Z</option>
    <option value="ZA">Name: Z → A</option>
  </select>

</div>
 </div>
          
          
          
<div className="secondshoppage">

  {currentProducts.length === 0 ? (

    <div className="emptyBox">

      <h1>😔</h1>

      <h2>No Products Found</h2>

      <p>Try another search or category.</p>

    </div>

  ) : (

    currentProducts.map((product) => (

      <div
        key={product._id}
        className="shopProductCard"
      >

        {/* Yahan tumhara poora product card rahega */}
        <div className="imageBox">

          <span className="saleTag">-20%</span>

          <img
            src={product.image}
            alt={product.name}
            className="shopProductImage"
          />

          <div className="overlay">
            <button
              className="quickBtn"
              onClick={() =>
                navigate(`/singlepageproduct/${product._id}`)
              }
            >
              Quick View
            </button>
          </div>

        </div>

        <div className="product-infocard">


          <h2 className='product-namecard'>{product.name}</h2>

          <p className='descriptioncard'>{product.description?.slice(0,60)}....</p>
          <div className="ratingcard">
            ⭐⭐⭐⭐⭐ <span className='ratingspan'>(5.0)</span>
          </div>

          <div className="price-boxcard">
             <span className="new-price">
               <li> PKR = {product.price}</li>
             </span>

            <span className="old-price">
             <li> PKR = {Math.floor(product.price * 1.2)}</li>
            </span>
          </div>

          <div className="soldText">
            150+ Sold
          </div>

          <div className="productBtns">

            <button
              className="viewBtn"
              onClick={() =>
                navigate(`/singlepageproduct/${product._id}`)
              }
            >
              View Details
            </button>

            <button
              className="cartBtn"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    ))

  )}

</div>


<div className="pagination">

<button
disabled={currentPage===1}
onClick={()=>
setCurrentPage(currentPage-1)}
>
Previous
</button>

{
Array.from(
{length:totalPages},
(_,i)=>(

<button
key={i}
className={
currentPage===i+1
?
"activePage"
:
""
}
onClick={()=>
setCurrentPage(i+1)}
>

{i+1}

</button>

))
}

<button
disabled={currentPage===totalPages}
onClick={()=>
setCurrentPage(currentPage+1)}
>
Next
</button>

</div>






        </div>


        
      </div>
    </>
  )
}

export default Shoppage
