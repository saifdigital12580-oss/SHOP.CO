import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const navigate = useNavigate();
  // LocalStorage se cart load hoga
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Har change par LocalStorage update hoga
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product
  const addToCart = (product , term) => {
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    

    if ( term == "buy"){
      navigate("/CartPage")
    }
  };

  // Remove Product
const removeFromCart = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to remove this product from the cart?"
  );

  if (!confirmDelete) return;

  setCartItems((prev) => prev.filter((item) => item._id !== id));

  alert("✅ Product removed from cart successfully.");
};

  // Increase Qty
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Qty
  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cart");
};
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
        totalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);