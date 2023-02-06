import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
import useToken from "../../useToken";
import { ImSpinner2 } from "react-icons/im";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";
import Items from "./Items";
import { Button } from "../Button/Button";
import BillingAddress from "./BillingAddress";

import handleNot from "../HandleNotification/HandleNot";

const OrderDetail = () => {
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: orderData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "payment/getUserOrderDetails?token=" + token,
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
  return (
    <div
      style={{
        background: "white",
        boxShadow: "var(--box-shadow)",
        borderRadius: "20px",
        padding: "2px",
      }}
    >
      {loading ? (
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

            <Button
              buttonColor={"orange"}
              children={"Track order"}
              style={{ color: "white" }}
              onClick={() => trackOrder()}
            />
          </div>

          <h3>Amount:{order.totalAmount / 100}</h3>
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
