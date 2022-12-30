import { useContext } from "react";
import IconAndCircle from "../IconAndCircle/IconAndCircle";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Products.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { Icon } from "@iconify/react";
import LazyLoader from "../LazyLoader/LazyLoader";
import { toast } from "react-toastify";
import CartContext from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export const ClickableToast = ({ text }) => {
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

export const toastOptions = {
  theme: "colored",
  hideProgressBar: true,
};

const ProductItem = ({ item, productsSet, loading }) => {
  const catLoadArr = ["", "", "", "", "", ""];
  const history = useNavigate();
  const { cartItems, setCartItems, whishLists, setWhishLists } =
    useContext(CartContext);

  const handleAddToCart = () => {
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    if (index >= 0) {
      toast.success(<ClickableToast text="Already in cart" />, toastOptions);
      return;
    }
    item.quantityToBuy = 1;
    setCartItems((prev) => [item, ...prev]);
    toast.success(<ClickableToast />, toastOptions);
  };
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleAddToWhishList = () => {
    const index = whishLists.findIndex((wish) => wish._id === item._id);
    if (index >= 0) {
      toast.success(
        <ClickableToast text="Already whishlisted" />,
        toastOptions
      );
      return;
    }
    item.quantityToBuy = 1;
    setWhishLists((prev) => [item, ...prev]);
    toast.success(
      <ClickableToast text={"Added to whish list"} />,
      toastOptions
    );
  };

  return (
    <>
      {/* {loading ? (
        catLoadArr.map((item) => <LazyLoader key={item} />)
      ) : ( */}

      <div
        className="product-item class_justify_contents_column"
        style={{ alignItems: "flex-start" }}
        onClick={() =>
          history(`/products/${item.product_name}`, {
            state: {
              item,
            },
          })
        }
      >
        <img
          src={`${item.image}`}
          // src={`/svg/${productsSet.image}.svg`}
          className="product-item-image"
          alt=""
        />
        {/* this is body contents */}
        <div
          style={{
            padding: "1rem",
            justifyContent: "space-between",
            width: "87%",
          }}
          className={"class_justify_contents_row"}
        >
          <div>
            {/* first cart content */}
            <pre
              style={{ textAlign: "left", lineHeight: 0 }}
              className={"avenir_class gold_color_text"}
            >
              {item.category ?? "HTML/CSS"}
            </pre>
            <h3
              style={{ textAlign: "left", maxLines: 1 }}
              className="product-item-name"
            >
              {item.product_name ?? "HTML/CSS"}
            </h3>
            <p className="italics" style={{ fontSize: "21px" }}>
              {getSymbolFromCurrency("INR") + item.price}
            </p>
            {/* <ProgressBar
              percent={item.level}
              width={150}
              height={10}
              colorClass={productsSet.colorClass}
            /> */}
          </div>
          {/* add cart icon */}
          <div
            className="class_justify_contents_column"
            style={{
              justifyContent: "space-between",
              height: "70%",
            }}
          >
            <div
              className="class_justify_contents_row"
              onClick={(e) => {
                stopPropagation(e);
                handleAddToCart(item);
              }}
            >
              <Icon
                icon={"mdi:cart-arrow-down"}
                color="black"
                fontSize={"25px"}
                className={"product-item-icon"}
              />
              <pre className="showTip">Add to Cart</pre>
            </div>
            <div
              onClick={(e) => {
                stopPropagation(e);
                handleAddToWhishList(item);
              }}
            >
              <Icon
                icon={"mdi:love"}
                color="rgb(85, 83, 83)"
                fontSize={"25px"}
                className={"product-item-icon"}
              />
              <pre className="showTip">Add to Wish List</pre>
            </div>
          </div>
        </div>
      </div>

      {/* )} */}
    </>
  );
};

export default ProductItem;
