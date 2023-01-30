import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { _ } from "lodash";
import GradientText from "../../../components/utilitiescomponent/GradientText";
import useFetch from "../../../useFetch";
import getSymbolFromCurrency from "currency-symbol-map";
import moment from "moment";
function Overall({}) {
  const {
    data: ordersData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "payment/orders",
    // secondParam: openModal,
  });
  const IconWrapper = ({ type, IconPadding, iconFontSize }) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              type === "content"
                ? "#f25c3240"
                : type === "graphics"
                ? "#00c32a3e"
                : type === "video"
                ? "#00c4f03d"
                : "#35448c36",
            // color: type === "request" ? "grey" : "white",
            color:
              type === "content"
                ? "#F25B32"
                : type === "graphics"
                ? "#00C32B"
                : type === "video"
                ? "#00C4F0"
                : "var(--dashboard-dark-blue)",
            borderRadius: "50%",
            padding: IconPadding ?? "5px",
            fontSize: iconFontSize ?? "12px",
          }}
        >
          {type === "request" && (
            <Icon borderRadius="1em" icon="bxs:bar-chart-square" />
          )}
          {type === "content" && (
            <Icon icon="bxs:bar-chart-square" rotate={1} />
          )}
          {type === "graphics" && <Icon icon="fa6-solid:radio" />}
          {type === "video" && <Icon icon="eva:video-fill" />}
        </div>
      </>
    );
  };
  const IconAndName = ({ type, title, quantity }) => {
    return (
      <div
        className="dashboard-card-row"
        style={{
          gap: "0",
          marginTop: "1rem",
          textAlign: "left",
          textOverflow: "clip",
        }}
      >
        <IconWrapper type={type} iconFontSize="20px" IconPadding="15px" />
        <div
          className="pic-text" //this comes from profilepicscomponent
          style={{
            textOverflow: "clip",
            display: "flex",
            justifyContent: "left",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontWeight: "500",
              color: "black",
              textOverflow: "clip",
            }}
          >
            {title ?? "title"}
          </p>
          {<span>{quantity ?? 23}</span>}
        </div>
      </div>
    );
  };
  var colorClass = _.sampleSize(
    ["content", "graphics", "video", "graphics"],
    3
  );

  return (
    <>
      <div
        style={{
          width: window.innerWidth < 960 ? "120%" : "80%",
          height: "500px",
          marginLeft: 10,
          marginTop: window.innerWidth < 960 && "30px",
          boxShadow: "0 10px 30px 3px rgb(131 8 255 / 20%)",
        }}
        className="request-progress-container"
      >
        <div className="rqs-header-wrapper"></div>
        <h4>Recent Orders</h4>

        {loading ? (
          <div>
            <GradientText text={"Radiant Clothing"} />{" "}
          </div>
        ) : (
          ordersData.analytics.recentOrders.map((order, index) => (
            <IconAndName
              type={colorClass[index ?? 1]}
              title={getSymbolFromCurrency("INR") + order.amount}
              quantity={moment(order.createdAt).format("DD MMMM, YYYY")}
            />
          ))
        )}
        {/* <IconAndName type={colorClass[1]} title="Design social ..." />
        <IconAndName type={colorClass[2]} title="Create explainer..." /> */}

        <Button
          buttonColor={"orange"}
          style={{ color: "white" }}
          buttonStyle=""
        >
          More
        </Button>
      </div>
    </>
  );
}

export default Overall;
