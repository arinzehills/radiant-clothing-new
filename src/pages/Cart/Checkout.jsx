import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { ImSpinner2 } from "react-icons/im";
import { CustomInput } from ".";
import axios from "axios";

import "./cart.css";

const Checkout = ({ toggleCheckout, getTotalPrice }) => {
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:3002/payment/";
  const navigate = useNavigate();

  const [totalAmount, getTotalAmount] = useState(() => getTotalPrice());

  const initPayment = (data) => {
    const options = {
      key: data.KEY_ID,
      order_id: data.id,
      currency: data.currency,
      amount: data.amount,
      name: "Radiant Clothing",
      description: "Super amamzing description...",
      handler: async (response) => {
        try {
          const { data } = axios.post(`${API_URL}verify`, response);
          window.localStorage.removeItem("radiant_cart_item");
          navigate("/payment-success");
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const orderUrl = `${API_URL}order`;
      const { data } = await axios.post(orderUrl, { amount: totalAmount }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="checkout">
        <div>
          <p>CHECKOUT</p>
          <button onClick={toggleCheckout}>
            CLOSE
            <CgCloseO size={24} color="coral" />
          </button>
        </div>
        <div>
          <div className="left ">
            <p>Personal Information</p>
            <div>
              <div className="parent">
                <CustomInput placeholder="Full Name" className="input-style" />
                <CustomInput
                  placeholder="Phone Number"
                  className="input-style"
                />
              </div>
              <CustomInput
                type="email"
                placeholder="Email"
                className="input-style"
              />
              <div className="parent">
                <CustomInput placeholder="City" className="input-style" />
                <CustomInput placeholder="State" className="input-style" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  disabled={loading}
                  className="proceed-to-pay-btn"
                  onClick={paymentHandler}
                >
                  {loading ? (
                    <ImSpinner2 size={20} style={{ marginInline: "auto" }} />
                  ) : (
                    `Proceed to Pay`
                  )}
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                borderTop: "1px solid gainsboro",
                paddingTop: 5
              }}
            >
              <p style={{ fontSize: 12 }}>
                <span style={{ color: "coral", fontWeight: 700 }}>NOTE:</span>{" "}
                The Informations supplied above are used for order tracking
                purpose only and is treated in compliance with the US privacy
                act 1929.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
