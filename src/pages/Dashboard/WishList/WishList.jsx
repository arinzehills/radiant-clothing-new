import React, { useContext, useState } from "react";
import useUser from "../../../useUser";
import NavComponent from "../components/NavComponent/NavComponent";
import CartContext from "../../../context/CartContext";
import "./wishlist.css";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  ClickableToast,
  toastOptions,
} from "../../../components/Featured/ProductItem";
import empty from "../../../../public/images/empty.png";

const WishList = () => {
  const { user, setUser } = useUser();
  const { whishLists, setWhishLists, cartItems, setCartItems } =
    useContext(CartContext);

  const currencyFormater = (number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "INR",
    }).format(number);
  };

  const handleAddToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    if (index >= 0) {
      toast.success(<ClickableToast text="Already in cart" />, toastOptions);
      return;
    }
    item.quantityToBuy = 1;
    setCartItems((prev) => [item, ...prev]);
    toast.success(<ClickableToast />, toastOptions);
  };

  const removeWhishList = (_id) => {
    const newWhishList = whishLists.filter((item) => item._id !== _id);
    setWhishLists(newWhishList);
    toast.warn("One item removed from whishlist", toastOptions);
  };

  return (
    <div>
      <NavComponent
        personsName={user.email ?? "Admin"}
        //   handleClick={handleClick}
        pageTitle={`Wish Lists (${whishLists?.length || 0})`}
        // setHandleNotData={setHandleNotData}
      />
      {whishLists.length ? (
        <div
          className="wishlist"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 20,
          }}
        >
          {whishLists.map((item, idx) => (
            <div
              key={idx}
              className="item"
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "space-between",
                background: "white",
                padding: "30px 20px",
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <img src={item.images[0]} style={{ width: 100, height: 100 }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    <span style={{ fontWeight: 600 }}>{item.product_name}</span>
                    {" - "}
                    <span>{item.description}</span>
                  </p>
                  <div style={{ marginTop: "auto" }}>
                    <p style={{ fontWeight: 600 }}>
                      {currencyFormater(item.price)}
                    </p>
                    <p style={{ textDecoration: "line-through" }}>2,000</p>
                  </div>
                </div>
              </div>
              <div className="grid">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="whishlist-buy-btn"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => removeWhishList(item._id)}
                  className="wishlist-remove-btn"
                >
                  <RiDeleteBin4Fill size={20} />
                  <span>REMOVE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "white",
            display: "grid",
            placeContent: "center",
            paddingBottom: 30,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <img src={empty} style={{ width: 200, marginTop: 20 }} />
          <p style={{ fontSize: 12, marginTop: -5, marginBottom: 15 }}>
            Items added to wishlists are <br /> displayed here.
          </p>
        </div>
      )}
    </div>
  );
};

export default WishList;
