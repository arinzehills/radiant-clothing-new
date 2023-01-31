import React, { useState, useEffect, useContext } from "react";
import { BsCart4, BsPatchCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ClickableToast } from "../../components/Featured/ProductItem";
import "./cart.css";
import axios from "axios";
import Checkout from "./Checkout";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/Featured/ProductItem";
import empty from "../../../public/images/empty.png";
import { RiDeleteBin2Fill } from "react-icons/ri";
import AddressContainer from "./AddressContainer";
import CartContainer from "./CartContainer";
import useFetch from "../../useFetch";
import useUser from "../../useUser";

export const CustomInput = (props) => {
  const { helperText, label } = props;
  if (!helperText)
    return (
      <div>
        {label ? (
          <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
        ) : null}
        <input type="text" {...props} />
      </div>
    );
  else
    return (
      <div>
        {label ? (
          <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
        ) : null}
        <input style={{ width: "100%" }} type="text" {...props} />
        <p style={{ fontSize: 12 }}>{helperText}</p>
      </div>
    );
};

const Cart = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const currencyFormater = (number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "INR",
    }).format(number);
  };
  const dummyProducts = [
    {
      imgUrl: "../../../public/images/white_shopping.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "English",
      price: "$7,000",
      quantity: 1,
    },
  ];
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const { cartItems, setCartItems, whishLists, setWhishLists } =
    useContext(CartContext);
  const {
    data: billingAddresses,
    loading: loadingAddresses,
    error,
  } = useFetch({
    url: window.baseUrl + "payment/getBillingAddress",
    fetchParamData: { user_id: user._id },
    secondParam: checkout,
  });
  const API_URL = window.baseUrl + "payment/";
 const [selectedAddress, setSelectedAddress] = useState(
    billingAddresses?.billing_address[0]
  );
  useEffect(()=>{
    setSelectedAddress( billingAddresses?.billing_address[0])
  },[loadingAddresses])
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

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.discount_price * item.quantityToBuy;
    });
    console.log(totalPrice);
    return totalPrice;
  };
  const getTotalGst = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.gst * item.quantityToBuy;
    });
    return totalPrice;
  };

  const toggleCheckout = () => {
    setCheckout(!checkout);
  };
  const [totalAmount, getTotalAmount] = useState(() => getTotalPrice());

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  const initPayment = (data) => {
    const options = {
      key: data.KEY_ID,
      order_id: data.id,
      currency: data.currency,
      amount: data.amount,
      name: "Radiant Clothing",

      description: "Super amamzing description...",
      handler: async (response) => {
        response.amount = data.amount;
        response.user_id = user._id;
        response.billing_address=selectedAddress;
        response.products=cartItems
        console.log(response)
        try {
          const { data } = axios.post(`${API_URL}verify`, response);
          console.log(data)
          // window.localStorage.removeItem("radiant_cart_item");
          // navigate("/payment-success");
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        method: "card",
        name:selectedAddress.fullname ??"Gaurav Kumar",
        contact:selectedAddress.phoneNumber?? "+919000090000",
        email:user.email?? "gaurav.kumar@example.com",
        // "card[name]": "Gaurav Kumar",
        "card[number]": "4111111111111111",
        "card[expiry]": "12/23",
        "card[cvv]": "123",
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler = async () => {
    setLoading(true);
    try {
      const orderUrl = `${API_URL}order`;
      const { data } = await axios.post(orderUrl, { amount: totalAmount}); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(billingAddresses);

  return (
    <>
      <div class="cart-container">
        <div>
          {showAddress ? (
            <AddressContainer
              billingAddresses={billingAddresses}
              toggleCheckout={toggleCheckout}
              loadingAddr={loadingAddresses}
              selected={selectedAddress}
              setSelected={setSelectedAddress}
            />
          ) : (
            <CartContainer
              cartItems={cartItems}
              currencyFormater={currencyFormater}
            />
          )}
          <div className="cart-summary">
            <p style={{ fontWeight: 600 }}>Cart Summary</p>
            <div style={{ borderBottom: "1px solid gainsboro", padding: 20 }}>
              <div class="subtotal ">
                <p style={{ fontWeight: 600, paddingBlock: 5 }}>GST</p>
                <p>{currencyFormater(getTotalGst())}</p>
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
                onClick={() =>
                  billingAddresses?.billing_address?.length === 0
                    ? toggleCheckout()
                    : showAddress
                    ? paymentHandler()
                    : setShowAddress(true)
                }
                className="checkout-btn"
              >
                {showAddress
                  ? `Proceed ${currencyFormater(
                      getTotalPrice() + getTotalGst()
                    )}`
                  : `CHECKOUT ${currencyFormater(
                      getTotalPrice() + getTotalGst()
                    )}`}
              </button>
            </div>
          </div>
        </div>
        {/* wish list starts here */}
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
              <img src={empty} style={{ width: 200, margin: "auto" }} />
              <p style={{ fontSize: 12, marginTop: -20, marginBottom: 15 }}>
                Items added to wishlists are <br /> displayed here.
              </p>
            </div>
          )}
        </div>
        <div className="also-like" style={{ display: "none" }}>
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
          loading={loading}
          setShowAddress={setShowAddress}
        />
      )}
    </>
  );
};

export default Cart;
