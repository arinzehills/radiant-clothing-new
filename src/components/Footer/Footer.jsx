import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./Footer.css";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { Button } from "../Button/Button";
import GradientText from "../utilitiescomponent/GradientText";

function Footer() {
  const FooterText = () => {
    return (
      <>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-40rem",
            marginTop: "26rem",
            flexDirection: "column",
            gap: "1rem",
            zIndex: "999999",
            color: "white",
          }}
        >
          <div style={{ display: "flex", color: "white", gap: "3rem" }}>
            <div
              style={{
                width: "250px",
                flexDirection: "column",
              }}
            >
              <p style={{}} className={"italics"}>
                Talk to us now
              </p>
              <h3 style={{ textTransform: "uppercase" }}>Contact Us</h3>
              <p>5701 Outlets at Tejon Pkwy, New Delhi ranch CA 93203 India.</p>
            </div>
            <div>
              <p className={"italics"}>Explore!</p>
              <h3 style={{ color: "white", textTransform: "uppercase" }}>
                Our services
              </h3>
              <div className="footer-link-items">
                <Link to="/pricing">Home</Link>
                <Link to="/pricing">About us</Link>
                <Link to="/pricing">Contact Us</Link>
                <Link to="/pricing">FAQ</Link>
                <Link to="/pricing">Terms and Condition</Link>
                {/* <a href="https://www.conterize.com/blog">Blog</a> */}
              </div>
            </div>
          </div>

          <p
            className="avenir_class"
            style={{
              marginTop: "0.3rem",
              width: "500px",
              textAlign: "center",
            }}
          >
            follow us on
          </p>
          <div className="centerClass" style={{ gap: "2rem" }}>
            <FooterIcon iconName={"FaFacebook"} />
            <FooterIcon iconName={"FaInstagram"} />
            <FooterIcon iconName={"FaTwitter"} />
            <FooterIcon iconName={"FaWhatsapp"} />
            <FooterIcon iconName={"FaLinkedin"} />
          </div>
          <GradientText
            text={" RADIANT CLOTHING"}
            style={{ lineHeight: 1, fontSize: "2vw", textAlign: "left" }}
          />
          <p>&copy; 2022</p>
        </div>
      </>
    );
  };
  const FooterIcon = ({ iconName }) => {
    return (
      <>
        <div
          style={{
            // background: "white",
            height: "50px",
            width: "50px",
            borderRadius: "50px",
          }}
          className="centerClass gold_color_light"
        >
          {iconName === "FaTwitter" ? (
            <FaTwitter fill="#000" fontSize={"20px"} />
          ) : iconName === "FaLinkedin" ? (
            <FaLinkedin fill="#000" fontSize={"20px"} />
          ) : iconName === "FaWhatsapp" ? (
            <FaWhatsapp fill="#000" fontSize={"20px"} />
          ) : iconName === "FaInstagram" ? (
            <FaInstagram fill="#000" fontSize={"20px"} />
          ) : (
            <FaFacebook fill="#000" fontSize={"20px"} />
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <div style={{ marginTop: "-13rem" }}>
        <FooterText />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-6rem",
            zIndex: "99",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "2rem",
              borderRadius: "13px",
              height: "8rem",
              color: "black",
            }}
            className="gold_color"
          >
            <h2>Contact</h2>
            <p style={{ fontWeight: "600" }}>
              Have more questions? Or need more <br />
              information contact me
            </p>
            <Link to={"/contact"}>
              <Button
                buttonColor={"black"}
                children="Contact"
                isCircular={"true"}
              />
            </Link>
          </div>
        </div>
        <img
          src="/svg/footer.svg"
          alt=""
          width={"100%"}
          height={"50%"}
          style={{ zIndex: "0" }}
        />
      </div>
    </>
  );
}

export default Footer;
