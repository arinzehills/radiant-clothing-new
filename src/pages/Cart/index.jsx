import React, { useState, useEffect, useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCart4, BsPatchCheck } from "react-icons/bs";
import { IoMdArrowBack, IoMdNotifications } from "react-icons/io";
import search from "../../../public/images/no-record-found.png";
import { Link, useNavigate } from "react-router-dom";
import { ClickableToast } from "../../components/Featured/ProductItem";

import "./cart.css";
import Checkout from "./Checkout";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/Featured/ProductItem";
import empty from "../../../public/images/empty.png";
import { RiDeleteBin2Fill } from "react-icons/ri";

export const CustomInput = (props) => {
  return <input type="text" {...props} />;
};

const Cart = () => {
  const navigate = useNavigate();
  const currencyFormater = (number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "INR",
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
  const { cartItems, setCartItems, whishLists, setWhishLists } =
    useContext(CartContext);

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

  const removeItem = (_id) => {
    const newCartItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(newCartItems);
    toast.warn("One item removed from cart", toastOptions);
  };

  const removeWhishList = (_id) => {
    const newWhishList = whishLists.filter((item) => item._id !== _id);
    setWhishLists(newWhishList);
    toast.warn("One item removed from whishlist", toastOptions);
  };

  const minusQuantity = (_id) => {
    const currentItem = cartItems.find((item) => item._id === _id);
    if (currentItem.quantityToBuy === 1) return;
    const newCartItems = cartItems.map((item) => {
      if (item._id === _id) {
        return { ...item, quantityToBuy: item.quantityToBuy - 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };
  const plusQuantity = (_id) => {
    const newCartItems = cartItems.map((item) => {
      if (item._id === _id) {
        return { ...item, quantityToBuy: item.quantityToBuy + 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.discount_price * item.quantityToBuy;
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
  const percetage = (product) => {
    var discount = (product.price - product.discount_price) / product.price;
    return (discount * 100).toFixed(0) + "%";
  };
  return (
    <>
      <div class="cart-container">
        <div>
          <div style={{ position: "relative" }}>
            <p>Cart ({cartItems.length})</p>
            <span
              role="button"
              onClick={() => navigate("/")}
              className="back-span"
            >
              {" "}
              <IoMdArrowBack /> Go back to shopping
            </span>
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
                          <img src={item.images[0]} />
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                marginRight: 10,
                              }}
                            >
                              <p style={{ fontSize: 14, fontWeight: 700 }}>
                                {item.product_name} -{" "}
                                <span style={{ fontWeight: 400 }}>
                                  {item.description}
                                </span>{" "}
                              </p>
                              <p style={{ textTransform: "capitalize" }}>
                                <span
                                  style={{ marginBlock: 5, fontWeight: 600 }}
                                >
                                  Category
                                </span>{" "}
                                - {item.category}
                              </p>
                              <p>
                                Size -{" "}
                                <span style={{ color: "coral" }}>
                                  {item.size || "XXL"}
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
                                <span>{item.quantity || 0} units left</span>
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 14, fontWeight: 600 }}>
                                {currencyFormater(item.discount_price)}
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
                                    whiteSpace: "nowrap",
                                    textDecoration: "line-through",
                                    color: "coral",
                                  }}
                                >
                                  {/* N 8,000 */}
                                  {item.price}
                                </p>
                                {/* <p>50%</p> */}
                                <p>{percetage(item)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="bottom">
                        <button onClick={() => removeItem(item._id)}>
                          <AiFillDelete color="coral" size={22} />
                          <span>DELETE</span>
                        </button>
                        <div>
                          <button
                            onClick={() => minusQuantity(item._id)}
                            style={{
                              padding: "2px 12px ",
                              borderRadius: 4,
                              fontSize: 24,
                              background:
                                item.quantityToBuy === 1
                                  ? "rgb(220 252 231)"
                                  : "rgb(74 222 128)",
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 600 }}>
                            {item.quantityToBuy}
                          </span>
                          <button
                            onClick={() => plusQuantity(item._id)}
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
            <p style={{ fontWeight: 600 }}>Cart Summary</p>
            <div style={{ borderBottom: "1px solid gainsboro", padding: 20 }}>
              <div class="subtotal ">
                <p style={{ fontWeight: 600, paddingBlock: 5 }}>GST</p>
                <p>{currencyFormater(0)}</p>
              </div>
              <div class="subtotal ">
                <p style={{ fontWeight: 600, paddingBlock: 5 }}>Subtotal</p>
                <p>{currencyFormater(getTotalPrice())}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <button
                disabled={getTotalPrice() === 0}
                onClick={toggleCheckout}
                className="checkout-btn"
              >
                CHECKOUT {currencyFormater(getTotalPrice())}
              </button>
            </div>
          </div>
        </div>
        <div className="saved-for-later">
          <p>Your Wishlists</p>
          {whishLists.length ? (
            <div
              className="four-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 10,
              }}
            >
              {whishLists.map((product, idx) => (
                <div key={idx} class="item">
                  <img style={{ marginBottom: 5 }} src={product.images[0]} />
                  <div
                    style={{
                      marginRight: 28,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ marginTop: 8 }}>{product.product_name}</p>
                      <p style={{ marginTop: 4, color: "rgb(74 222 128)" }}>
                        {product.category}
                      </p>
                    </div>
                    <span
                      onClick={() => removeWhishList(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <RiDeleteBin2Fill color="red" size={21} />
                    </span>
                  </div>
                  <div class="bottom">
                    <p style={{ fontWeight: 600 }}>
                      {currencyFormater(product.price)}
                    </p>
                    <button onClick={() => handleAddToCart(product)}>
                      <BsCart4 size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                placeContent: "center",
                paddingBottom: 20,
                textAlign: "center",
              }}
            >
              <img src={empty} style={{ width: 200 }} />
              <p style={{ fontSize: 12, marginTop: -20, marginBottom: 15 }}>
                Items added to wishlists are <br /> displayed here.
              </p>
            </div>
          )}
        </div>
        <div className="also-like">
          <p>You May Also Like</p>
          <div>
            {dummyProducts.map((product, idx) => (
              <div key={idx} class={`item`}>
                <img src={product.imgUrl} />
                <p style={{ width: "80%", marginTop: 8, fontSize: 14 }}>
                  {product.name}
                </p>
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
      {checkout && (
        <Checkout
          toggleCheckout={toggleCheckout}
          getTotalPrice={getTotalPrice}
        />
      )}
    </>
  );
};

export default Cart;
