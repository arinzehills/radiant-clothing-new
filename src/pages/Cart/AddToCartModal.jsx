import React, { useContext } from "react";
import { Button } from "../../components/Button/Button";
import {
  ClickableToast,
  toastOptions
} from "../../components/Featured/ProductItem";
import { toast } from "react-toastify";
import CartContext from "../../context/CartContext";

const AddToCartModal = ({ item, itemSize, setItemSize, setOpenModal }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const random = () => crypto.randomUUID();
  console.log(item);

  const handleAddToCart = () => {
    const index = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id && cartItem.size === item.size
    );
    if (index >= 0) {
      toast.success(<ClickableToast text="Already in cart" />, toastOptions);
      return;
    }
    item.quantityToBuy = 1;
    item.size = itemSize;
    if (!item.randomKey) item.randomKey = `${item._id}${random()}`;
    setCartItems((prev) => [item, ...prev]);
    toast.success(<ClickableToast />, toastOptions);
  };

  return (
    <div>
      <h4>Please Select Size</h4>
      <div className="class_justify_contents_row" style={{ gap: "1rem" }}>
        {item.sizes.map((size) => (
          <div
            style={{
              border: "var(--border",
              padding: "10px",
              color: itemSize === size && "white"
            }}
            className={itemSize === size && "orange"}
            onClick={() => setItemSize(size)}
          >
            {size}
          </div>
        ))}
      </div>
      <Button
        buttonColor={"orange"}
        style={{ color: "white" }}
        loading={itemSize === "" ? true : false}
        loadingText="Add to Cart"
        onClick={() => {
          handleAddToCart(item);
          setOpenModal(false);
        }}
      >
        {"Add to cart"}
      </Button>
    </div>
  );
};

export default AddToCartModal;
