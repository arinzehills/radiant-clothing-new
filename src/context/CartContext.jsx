import { useState, useEffect, createContext } from "react";

const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getLocalStorageItems);
  const value = { cartItems, setCartItems };

  function getLocalStorageItems() {
    let cartItems = window.localStorage.getItem("radiant_cart_item");
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
      return cartItems;
    } else return [];
  }

  useEffect(() => {
    console.log(cartItems);
    window.localStorage.setItem("radiant_cart_item", JSON.stringify(cartItems));
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
