import getSymbolFromCurrency from "currency-symbol-map";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { Button } from "../Button/Button";
import ImageSlider from "../HeroSlider/ImageSlider";
import { toast } from "react-toastify";
import { toastOptions } from "./ProductItem";

const ProductDetail = ({}) => {
  const location = useLocation();
  console.log(location.state.item);
  const product = location.state.item;
  const { cartItems, setCartItems } = useContext(CartContext);

  const percetage = (product.price - product.discount_price) / product.price;
  // setPercentageDiscount(percetage * 100);
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

  const ClickableToast = ({ text }) => {
    const navigate = useNavigate();
    return (
      <p
        onClick={() => navigate("/cart")}
        style={{ fontSize: 14, margin: 0, gap: 3, display: "flex" }}
      >
        {text ? text : "Added to cart!"}
        <span
          style={{
            textDecoration: "underline",
            display: "block",
            color: "white",
            marginLeft: 2,
          }}
        >
          Click to view{" "}
        </span>
      </p>
    );
  };

  return (
    <div
      className="class_justify_contents_row"
      style={{
        justifyContent: "space-around",
        padding: "2rem",
        alignItems: "start",
        // width: "100%",
      }}
    >
      {/* <img src={product.image} alt="" height={"300px"} /> */}
      <ImageSlider
        slides={product.images}
        isNotMap={true}
        style={{ height: "300px", width: "400px" }}
      />
      <div style={{ padding: "15px" }}>
        <h3
          style={{ textAlign: "left", margin: 0 }}
          className="product-item-name"
        >
          {product.product_name ?? "HTML/CSS"}
        </h3>
        <div
          style={{
            fontSize: "2.8w",
            display: "flex",
            gap: "5px",
            fontWeight: "bold",
          }}
        >
          <div className="more_pop">In Stock:</div>
          {product.quantity} items
        </div>
        {/* <div style={{ w }}></div> */}
        <p
          className="avenir_class"
          style={{ lineHeight: "inherit", width: "80%" }}
        >
          {product.description}
        </p>
        <pre
          style={{ textAlign: "left" }}
          className={"avenir_class gold_color_text"}
        >
          CATEGORY- {product.category ?? "HTML/CSS"}
        </pre>
        <h4 style={{ margin: 0 }}>
          Price: {getSymbolFromCurrency("INR") + "  " + product.discount_price}
        </h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            style={{
              textDecoration: "line-through",
              color: "grey",
            }}
          >
            {getSymbolFromCurrency("INR") + "  " + product.price}
          </p>
          <p className="more_pop">{(percetage * 100).toFixed(0) + "%"}</p>
        </div>
        <Button
          buttonColor={"gold"}
          buttonStyle={'btn--normal"'}
          children={"Add to Cart"}
          onClick={() => handleAddToCart(product)}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
