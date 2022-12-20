import { useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
import { CustomInput } from ".";

import "./cart.css";

const Checkout = ({ toggleCheckout }) => {
  const [paymentGateway, setPaymentGateway] = useState("stripe");
  const paymentGateways = ["stripe", "monnify"];
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
              <CustomInput placeholder="Phone Number" className="input-style" />
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
          </div>
        </div>
        <div class="right ">
          <p>Delivery</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ paddingTop: 10 }}>
              I want to pay with{" "}
              <span style={{ textTransform: "capitalize" }}>
                {paymentGateway}
              </span>
            </p>
            <div>
              {paymentGateways.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setPaymentGateway(item)}
                  style={{
                    position: item === paymentGateway ? "relative" : "none",
                  }}
                >
                  {item}
                  {item === paymentGateway && (
                    <BsPatchCheck
                      style={{ position: "absolute", top: 8, right: 8 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button>Proceed to Pay</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Checkout;
