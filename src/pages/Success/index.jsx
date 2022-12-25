import React from "react";
import "./success.css";
import mark from "../../assets/success.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="success">
      <div className="container">
        <img src={mark} style={{ width: 50, marginInline: "auto" }} />
        <p className="congrats">Success!!!</p>
        <p>
          Thank you for patronizing{" "}
          <span style={{ fontWeight: 700 }}> RADIANT CLOTHING.</span>
        </p>
        <p style={{ marginTop: -12 }}>
          Your order have been placed successfully.{" "}
        </p>
        <p className="more-info">For more information, check your email!!!</p>
        <button onClick={handleNavigateHome} className="ok-btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Index;
