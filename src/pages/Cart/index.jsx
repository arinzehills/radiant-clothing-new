import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCart4, BsPatchCheck } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import imgUrl1 from "../../../public/images/contact.jpg";
import search from "../../../public/images/no-record-found.png";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";

import "./cart.css";
import Checkout from "./Checkout";

export const CustomInput = (props) => {
  return <input type="text" {...props} />;
};

const Cart = () => {
  const currencyFormater = (number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "NGN",
    }).format(number);
  };
  const dummyProducts = [
    {
      imgUrl: "../../../public/images/contact.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Native",
      price: "$4,500",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/white_shopping.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "English",
      price: "$7,000",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/straight-suit.jpeg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Ankara",
      price: "$12,750",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/white_shopping.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Multipurpose",
      price: "$4,500",
      quantity: 1,
    },
  ];
  const [checkout, setCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "De Facto Man Regular Knitted Fit Polo . Tshirt . Black",
      category: "Native",
      size: "M",
      price: 2800,
      imgUrl: imgUrl1,
      quantity: 1,
    },
    {
      id: 2,
      name: "De Facto Man Regular Knitted Fit Polo . Tshirt . Black",
      category: "Native",
      size: "M",
      price: 1000,
      imgUrl: imgUrl1,
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const minusQuantity = (id) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem.quantity === 1) return;
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };
  const plusQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.price * item.quantity;
    });
    console.log(totalPrice);
    return totalPrice;
  };

  const toggleCheckout = () => {
    setCheckout(!checkout);
  };

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  return (
    <>
      <div class="cart-container">
        <div>
          <div>
            <p>Cart ({cartItems.length})</p>
            <>
              {cartItems.length ? (
                <div className="cart-with-items">
                  {cartItems.map((item, idx) => (
                    <div
                      className="item"
                      style={{
                        borderTop: idx !== 0 ? "1px solid gainsboro" : "none",
                      }}
                    >
                      <div className="top">
                        <div key={idx}>
                          <img src={item.imgUrl} />
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                              }}
                              class="flex flex-col gap-1"
                            >
                              <p style={{ fontSize: 14 }}>{item.name}</p>
                              <p>Category - {item.category}</p>
                              <p>
                                Size -{" "}
                                <span style={{ color: "coral" }}>
                                  {item.size || "M"}
                                </span>
                              </p>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                <IoMdNotifications color="coral" size={20} />{" "}
                                <span>7 units left</span>
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 14, fontWeight: 600 }}>
                                {currencyFormater(item.price)}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  fontSize: 14,
                                }}
                              >
                                <p
                                  style={{
                                    textDecoration: "line-through",
                                    color: "coral",
                                  }}
                                >
                                  N 8,000
                                </p>
                                <p>50%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="bottom">
                        <button onClick={() => removeItem(item.id)}>
                          <AiFillDelete color="coral" size={22} />
                          <span>DELETE</span>
                        </button>
                        <div>
                          <button
                            onClick={() => minusQuantity(item.id)}
                            style={{
                              padding: "2px 12px ",
                              borderRadius: 4,
                              fontSize: 24,
                              background:
                                item.quantity === 1
                                  ? "rgb(220 252 231)"
                                  : "rgb(74 222 128)",
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => plusQuantity(item.id)}
                            style={{
                              padding: " 4px 10px",
                              borderRadius: 4,
                              fontSize: 20,
                              background: "rgb(74 222 128)",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="cart-without-items ">
                  <img src={search} />
                  <p>Your cart is empty at the moment!</p>
                  <Link to="../">Start Shopping</Link>
                </div>
              )}
            </>
          </div>
          <div className="cart-summary">
            <p style={{fontWeight:600}}>Cart Summary</p>
            <div style={{ borderBottom: "1px solid gainsboro", padding: 20 }}>
              <div class="subtotal ">
                <p style={{ fontWeight: 600, paddingBlock:5 }}>VAT</p>
                <p>{currencyFormater(0)}</p>
              </div>
              <div class="subtotal ">
                <p style={{ fontWeight: 600, paddingBlock:5 }}>Subtotal</p>
                <p>{currencyFormater(getTotalPrice())}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <button
                onClick={toggleCheckout}
              className="checkout-btn"
              >
                CHECKOUT {currencyFormater(getTotalPrice())}
              </button>
            </div>
          </div>
        </div>
        <div className="saved-for-later">
          <p>Saved For Later</p>
          <div>
            {dummyProducts.map((product, idx) => (
              <div key={idx} class="item">
                <img src={product.imgUrl} />
                <p style={{ marginTop: 8 }}>{product.name}</p>
                <p style={{ marginTop: 4, color: "rgb(74 222 128)" }}>
                  {product.category}
                </p>
                <div class="bottom">
                  <p style={{ fontWeight: 600 }}>{product.price}</p>
                  <button>
                    <BsCart4 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="also-like">
          <p>You May Also Like</p>
          <div>
            {dummyProducts.map((product, idx) => (
              <div key={idx} class={`item`}>
                <img src={product.imgUrl} />
                <p style={{width:'80%', marginTop: 8, fontSize: 14 }}>{product.name}</p>
                <p style={{ marginTop: 4, color: "tomato" }}>
                  {product.category}
                </p>
                <div class="bottom ">
                  <p style={{ fontWeight: 600 }}>{product.price}</p>
                  <button>
                    <BsCart4 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {checkout && <Checkout toggleCheckout={toggleCheckout} />}
    </>
  );
};

export default Cart;
