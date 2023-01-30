import { useEffect, useContext } from "react";
import "./success.css";
import mark from "../../assets/success.png";
import { useNavigate } from "react-router-dom";

import logo from "../../../public/images/logo.png";
import CartContext from "../../context/CartContext";

const Index = () => {
  const { setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setCartItems([]);
  }, []);

  return (
    <div className="success">
      <img
        style={{ marginInline: "auto", width: 200, marginTop: -50 }}
        src={logo}
      />
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
