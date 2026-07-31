import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    if (!userId) return;

    fetch(`http://localhost:1000/wishlist/${userId}`)
      .then(res => res.json())
      .then(data => {

        if (data.success) {

          setWishlist(data.wishlist);

        }

      })
      .catch(err => console.log(err));

  }, [userId]);



  const addWishlist = async(product)=>{

    if(!userId){

      alert("Please Login First");

      return;

    }

    const response = await fetch(

      "http://localhost:1000/wishlist/add",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          userId,

          productId:product._id

        })

      }

    );

    const data = await response.json();

    if(data.success){

      setWishlist(prev => [...prev, data.wishlist]);

    }else{

      alert(data.message);

    }

  };



  const removeWishlist = async(id)=>{

    await fetch(

      `http://localhost:1000/wishlist/remove/${id}`,

      {

        method:"DELETE"

      }

    );

    setWishlist(

      wishlist.filter(item=>item._id!==id)

    );

  };


const isWishlist = (productId) => {

 return wishlist.some(item =>

   item.productId === productId ||

   item.productId?._id === productId

 );

};



  return(

    <WishlistContext.Provider

      value={{

        wishlist,

        addWishlist,

        removeWishlist,

        isWishlist

      }}

    >

      {children}

    </WishlistContext.Provider>

  );

};

export const useWishlist=()=>useContext(WishlistContext);