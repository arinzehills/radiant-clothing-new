import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CgClose, CgCloseO } from "react-icons/cg";
import { ImSpinner2 } from "react-icons/im";
import { CustomInput } from ".";
import axios from "axios";

import "./cart.css";

const Checkout = ({ toggleCheckout, getTotalPrice }) => {
  const [loading, setLoading] = useState(false);
  // const API_URL = "http://localhost:3002/payment/";

  const API_URL = window.baseUrl + "payment/";
  console.log(API_URL);
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
        response.amount = data.amount;
        try {
          const { data } = axios.post(`${API_URL}verify`, response);
          window.localStorage.removeItem("radiant_cart_item");
          navigate("/payment-success");
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
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
  // "options": {
  //   "checkout": {
  //     "prefill": {
  //       "method": "card",
  //       "card[name]": "Gaurav Kumar",
  //       "card[number]": "4111111111111111",
  //       "card[expiry]": "12/21",
  //       "card[cvv]": "123"
  //     }
  //   }
  // }
  // "customer": {
  //   "name": "Gaurav Kumar",
  //   "contact": "+919000090000",
  //   "email": "gaurav.kumar@example.com"
  // },
  // https://apidocs.shiprocket.in/
  // https://www.shiprocket.in/developers/
  // https://www.youtube.com/watch?v=rXsSZ9utKZo
  //   import axios from 'axios';

  // const apiKey = 'YOUR_API_KEY';

  // axios.get('https://api.shiprocket.in/v1/external/courier/list', {
  //     headers: {
  //         'Authorization': 'Bearer ' + apiKey
  //     }
  // })
  // .then(response => {
  //     console.log(response.data);
  // })
  // .catch(error => {
  //     console.log(error);
  // });
  return (
    <div>
      <div className="checkout">
        <div></div>
        <div>
          <div className="left ">
            <CgClose
              onClick={toggleCheckout}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 15,
                top: 13,
              }}
            />
            <h2
              style={{ textAlign: "center", marginBottom: 30, marginTop: 10 }}
            >
              Checkout
            </h2>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <button
                  onClick={toggleCheckout}
                  style={{
                    fontSize: 14,
                    marginRight: 8,
                    padding: "8px 20px",
                    background: "gray",
                    borderRadius: 6,
                    color: "white",
                  }}
                >
                  Back
                </button>
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
                paddingTop: 5,
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
