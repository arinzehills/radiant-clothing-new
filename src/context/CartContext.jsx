import { useState, useEffect, createContext } from "react";

const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() =>
    getLocalStorageItems("radiant_cart_item")
  );

  const [whishLists, setWhishLists] = useState(() =>
    getLocalStorageItems("radiant_whishList_item")
  );

  function getLocalStorageItems(key) {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    }

    let items = window.localStorage.getItem(key);
    items = JSON.parse(items);
    return items;
  }

  useEffect(() => {
    console.log("cart items", cartItems);
    window.localStorage.setItem("radiant_cart_item", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    console.log("whishLists", whishLists);
    window.localStorage.setItem(
      "radiant_whishList_item",
      JSON.stringify(whishLists)
    );
  }, [whishLists]);

  const value = { cartItems, setCartItems, whishLists, setWhishLists };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
