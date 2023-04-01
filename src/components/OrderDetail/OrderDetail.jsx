import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
import useToken from "../../useToken";
import { ImSpinner2 } from "react-icons/im";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import Items from "./Items";
import { Button } from "../Button/Button";
import BillingAddress from "./BillingAddress";

import handleNot from "../HandleNotification/HandleNot";
import getSymbolFromCurrency from "currency-symbol-map";

const OrderDetail = () => {
  const { token, setToken } = useToken();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: orderData,
    loading: loadingOrder,
    error,
  } = useFetch({
    url: window.baseUrl + "order/getUserOrderDetails?token=" + token,
    fetchParamData: { order_id: location.state.order_id },
    // secondParam: activeRow,
  });
  const order = orderData?.order;
  const trackshipment = orderData?.track_shipment.tracking_data;
  console.log(orderData);
  const trackOrder = () => {
    if (trackshipment.track_status === 0) {
      handleNot({
        title: "Tracking info",
        message:
          trackshipment["error"] + "You can now log in" ?? "re successfully",
        backgroundColor: "var(--danger)",
      });
    } else {
      console.log("jdks");
      window.location.href = trackshipment.track_url;
    }
  };
  const returnOrder = async (order) => {
    console.log("delete Review Hitted at front end");
    setLoading(true);
    try {
      const saveUrl = `${window.baseUrl}order/returnOrder?token=${token}`;
      console.log(order);
      const { data } = await axios.post(saveUrl, {
        order: order,
      }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        background: "white",
        boxShadow: "var(--box-shadow)",
        borderRadius: "20px",
        padding: "2px",
      }}
    >
      {loadingOrder ? (
        <div style={{ height: "80vh", width: "80vw" }} className="centerClass">
          <ImSpinner2
            className="spin"
            size={80}
            style={{ marginInline: "auto" }}
          />
        </div>
      ) : (
        <div>
          <div
            className="class_justify_contents_row withGap"
            style={{
              flexDirection: window.innerWidth < 760 && "column",
              justifyContent: "space-around",
            }}
          >
            <div>
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                <BiArrowBack size={"40px"} />
              </div>
              <h3>Order:{order.order_id}</h3>
              <h3>
                Ordered On:
                {moment(order.createdAt).format("MM/DD/YYYY hh:mm A")}
              </h3>
            </div>

            <div>
              <Button
                buttonColor={"black"}
                children={"Track order"}
                style={{ color: "white" }}
                onClick={() => trackOrder()}
              />
              <Button
                buttonColor={"orange"}
                children={"Return order"}
                style={{ color: "white" }}
                onClick={() => returnOrder(order)}
              />
            </div>
          </div>

          <h3>Amount: {getSymbolFromCurrency("INR") + order.amount / 100}</h3>
          <div style={{ padding: "2rem", border: "1px solid grey" }}>
            <h3>Shipping Information:</h3>
            {<BillingAddress address={order.billing_address} />}
          </div>
          <div style={{ padding: "2rem" }}>
            <h3>Items:</h3>
            {order.products.map((product) => (
              <Items item={product} />
            ))}
          </div>
        </div>
      )}
      {/* <h1>{location.state.order}</h1> */}
    </div>
  );
};

export default OrderDetail;
