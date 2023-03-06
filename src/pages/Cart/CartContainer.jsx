import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import search from "../../../public/images/no-record-found.png";
import { AiFillDelete } from "react-icons/ai";
import { IoMdArrowBack, IoMdNotifications } from "react-icons/io";
import CartContext from "../../context/CartContext";
import { toastOptions } from "../../components/Featured/ProductItem";
import { toast } from "react-toastify";

const CartContainer = ({ currencyFormater }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const percetage = (product) => {
    var discount = (product.price - product.discount_price) / product.price;
    return (discount * 100).toFixed(0) + "%";
  };
  const removeItem = (_id, size) => {
    const newCartItems = cartItems.filter(
      (item) => item._id !== _id
      // && item.size === size
    );
    setCartItems(newCartItems);
    toast.warn("One item removed from cart", toastOptions);
  };
  const minusQuantity = (_id, size) => {
    const currentItem = cartItems.find(
      (item) => item._id === _id && item.size === size
    );
    if (currentItem.quantityToBuy === 1) return;
    const newCartItems = cartItems.map((item) => {
      if (item._id === _id) {
        return { ...item, quantityToBuy: item.quantityToBuy - 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };

  const plusQuantity = (_id, size) => {
    const newCartItems = cartItems.map((item) => {
      console.log(_id === item._id);
      console.log(size, item.size);
      if (item._id === _id && item.size === size) {
        return { ...item, quantityToBuy: item.quantityToBuy + 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };
  return (
    <div style={{ position: "relative" }}>
      <p>Cart ({cartItems.length})</p>
      <span role="button" onClick={() => navigate("/")} className="back-span">
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
                          display: "inline-block",
                          flexDirection: "column",
                          gap: 4,
                          marginRight: 10,
                          width: window.innerWidth > 769 && "600px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {item.product_name} -{" "}
                          <span
                            style={{
                              fontWeight: 400,
                            }}
                          >
                            {item.description}
                          </span>
                        </p>
                        <p style={{ textTransform: "capitalize" }}>
                          <span style={{ marginBlock: 5, fontWeight: 600 }}>
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
                  <button onClick={() => removeItem(item._id, item.size)}>
                    <AiFillDelete color="coral" size={22} />
                    <span>DELETE</span>
                  </button>
                  <div>
                    <button
                      onClick={() => minusQuantity(item._id, item.size)}
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
                      onClick={() => plusQuantity(item._id, item.size)}
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
          <div className="cart-without-items ">
            <img src={search} />
            <p>Your cart is empty at the moment!</p>
            <Link to="../">Start Shopping</Link>
          </div>
        )}
      </>
    </div>
  );
};

export default CartContainer;
