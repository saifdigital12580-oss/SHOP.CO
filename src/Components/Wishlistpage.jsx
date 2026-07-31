import React from "react";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "../Styles/wishlist.css";

const WishlistPage = () => {

  const {
    wishlist,
    removeWishlist
  } = useWishlist();

  const navigate = useNavigate();

  return (

    <div className="wishlist-page">

      <div className="wishlist-heading">

        <h1>❤️ My Wishlist</h1>

        <p>
          Your favourite products saved for later.
        </p>

      </div>

      {
        wishlist.length === 0 ?

        <div className="emptyWishlist">

          <h2>No Products Found</h2>

          <p>Add products by clicking the heart icon.</p>

        </div>

        :

        <div className="wishlist-grid">

          {
            wishlist.map((item)=>(

              <div
              className="wishlist-card"
              key={item._id}
              >

                <img
                src={item.productId.image}
                alt={item.productId.productName}
                />

                <h2>

                  {item.productId.productName}

                </h2>

                <p>

                  {item.productId.category}

                </p>

                <h3>

                  Rs {item.productId.price}

                </h3>

                <div className="wishlist-buttons">

                  <button

                  className="viewBtn"

                  onClick={()=>

                  navigate(`/singlepageproduct/${item.productId._id}`)

                  }

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

            ))
          }

        </div>

      }

    </div>

  );

};

export default WishlistPage;