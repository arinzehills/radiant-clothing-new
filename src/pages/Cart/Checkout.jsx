import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CgClose, CgCloseO } from "react-icons/cg";
import { ImSpinner2 } from "react-icons/im";
import { CustomInput } from ".";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./cart.css";

const Error = ({ text }) => {
  return <span style={{ fontSize: 12, color: "coral" }}>{text}</span>;
};

const Checkout = ({ toggleCheckout, getTotalPrice }) => {
  const [loading, setLoading] = useState(false);
  // const API_URL = "http://localhost:3002/payment/";

  const API_URL = window.baseUrl + "payment/";
  const navigate = useNavigate();

  const [totalAmount, getTotalAmount] = useState(() => getTotalPrice());

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("This field is required"),
    phoneNumber: Yup.string().required("This field is required"),
    addressLine1: Yup.string().required("This field is required"),
    addressLine2: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    country: Yup.string().required("This field is required")
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      country: ""
    },
    validationSchema,
    onSubmit(values) {
      paymentHandler();
      console.log(values);
    }
  });

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
        color: "#686CFD"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler = async () => {
    setLoading(true);
    try {
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
                top: 13
              }}
            />
            <h2
              style={{ textAlign: "center", marginBottom: 30, marginTop: 10 }}
            >
              Checkout
            </h2>
            <p>Personal Information</p>
            <form
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20
              }}
              onSubmit={formik.handleSubmit}
            >
              <div className="parent">
                <div>
                  <CustomInput
                    label="Full Name"
                    placeholder="Full Name"
                    className="input-style"
                    {...formik.getFieldProps("fullname")}
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <Error text={formik.errors.fullname} />
                  )}
                </div>
                <div>
                  <CustomInput
                    label="Phone Number"
                    placeholder="Phone Number"
                    className="input-style"
                    {...formik.getFieldProps("phoneNumber")}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <Error text={formik.errors.phoneNumber} />
                  )}
                </div>
              </div>
              <div>
                <CustomInput
                  label="Address Line 1"
                  type="text"
                  placeholder="Address Line 1"
                  className="input-style"
                  helperText="Street address, P.O.Box, Company name, c/o"
                  {...formik.getFieldProps("addressLine1")}
                />
                {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                  <Error text={formik.errors.addressLine1} />
                )}
              </div>
              <div>
                <CustomInput
                  label="Address Line 2"
                  type="text"
                  placeholder="Address Line 2"
                  className="input-style"
                  helperText="Apartment, suite, unit, building, floor, etc"
                  {...formik.getFieldProps("addressLine2")}
                />
                {formik.touched.addressLine2 && formik.errors.addressLine2 && (
                  <Error text={formik.errors.addressLine2} />
                )}
              </div>
              <div className="parent">
                <div>
                  <CustomInput
                    label="State"
                    placeholder="State/Pronvince/Region"
                    className="input-style"
                    {...formik.getFieldProps("state")}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <Error text={formik.errors.state} />
                  )}
                </div>
                <div>
                  <CustomInput
                    label="Country"
                    placeholder="Country"
                    className="input-style"
                    {...formik.getFieldProps("country")}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <Error text={formik.errors.country} />
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10
                }}
              >
                <button
                  onClick={toggleCheckout}
                  type="button"
                  style={{
                    fontSize: 14,
                    marginRight: 8,
                    padding: "8px 20px",
                    background: "gray",
                    borderRadius: 6,
                    color: "white"
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="proceed-to-pay-btn"
                >
                  {loading ? (
                    <ImSpinner2
                      className="spin"
                      size={20}
                      style={{ marginInline: "auto" }}
                    />
                  ) : (
                    `Proceed to Pay`
                  )}
                </button>
              </div>
            </form>
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
