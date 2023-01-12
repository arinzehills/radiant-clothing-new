import { Icon } from "@iconify/react";
import React from "react";

function Overall() {
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

  return (
    <>
      <div
        style={{
          width: window.innerWidth < 960 ? "120%" : "auto",
          height: "400px",
          marginLeft: 10,
          marginTop: window.innerWidth < 960 && "30px",
          boxShadow: "0 10px 30px 3px rgb(131 8 255 / 20%)",
        }}
        className="request-progress-container"
      >
        <div className="rqs-header-wrapper"></div>
        <h4>Recent Orders</h4>
        <IconAndName type={"content"} title="Write articles..." />
        <IconAndName type={"graphics"} title="Design social ..." />
        <IconAndName type={"video"} title="Create explainer..." />
      </div>
    </>
  );
}

export default Overall;
