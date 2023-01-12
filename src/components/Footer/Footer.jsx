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
import useFetch from "../../useFetch";

function Footer() {
  const {
    data: categoriesData,
    loading: loadingCategory,
    errorCategory,
  } = useFetch({
    url: window.baseUrl + "admin/getCategories",
    // secondParam: activeRow,
  });

  const FooterText = () => {
    return (
      <>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "8rem",
            gap: "1rem",
            color: "white",

            background: "black",
          }}
        >
          <div
            style={{ display: "flex", color: "white", gap: "3rem" }}
            className={"footer-text-container"}
          >
            <div
              style={{
                width: "250px",
              }}
            >
              <p style={{}} className={"italics"}>
                Talk to us now
              </p>
              <h3 style={{ textTransform: "uppercase" }}>Contact Us</h3>
              <p>
                Email:{" "}
                <a href="mailto:info@radiantclothings.com">
                  info@radiantclothings.com
                </a>
              </p>
              <p>
                Mobile: <a href="tel:+91 9984924444">+91 9984924444</a>
              </p>
              <p>
                3143/56-59, Ram Krishna Marg, Pratap Market, Aminabad, Lucknow,
                Uttar Pradesh-226018.
              </p>
            </div>
            <div>
              <p className={"italics"}>Explore!</p>
              <h3 style={{ color: "white", textTransform: "uppercase" }}>
                Customer Service
              </h3>
              <div className="footer-link-items">
                <Link to="/">Home</Link>
                <Link to="/about">About us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/faqs">FAQ</Link>
                <Link to="/terms-and-condition">Terms and Condition</Link>
                {/* <a href="https://www.conterize.com/blog">Blog</a> */}
              </div>
            </div>
            <div>
              <p className={"italics"}>Explore!</p>
              <h3 style={{ color: "white", textTransform: "uppercase" }}>
                Featured Categories
              </h3>
              <div className="footer-link-items">
                {loadingCategory ? (
                  <div
                    className="class_justify_contents_column"
                    style={{ height: "200px" }}
                  >
                    loading...
                  </div>
                ) : (
                  categoriesData?.categories?.map((item) => (
                    <Link
                      to={`/categories/${item.category}`}
                      key={item.category}
                    >
                      {item.category}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "0.3rem",
            width: "100%",
            textAlign: "center",
            color: "white",
          }}
          className={"class_justify_contents_column"}
        >
          <p className="avenir_class">follow us on</p>
          <div className="centerClass" style={{ gap: "1rem" }}>
            <FooterIcon iconName={"FaFacebook"} />
            <FooterIcon iconName={"FaInstagram"} />
            <FooterIcon iconName={"FaTwitter"} />
            <FooterIcon iconName={"FaWhatsapp"} />
            <FooterIcon iconName={"FaLinkedin"} />
          </div>
          <p>&copy; 2022</p>
          <GradientText
            text={" RADIANT CLOTHING"}
            style={{ lineHeight: 1, fontSize: "2.5vw", textAlign: "left" }}
          />
          <p className="avenir_class">Designed by- Ascend Digital</p>
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
          className=" centerClass gold_color_light"
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
      <div
        className="footer_wrapper class_justify_contents_row"
        style={{
          marginBottom: "-3rem",
          zIndex: "99",
          position: "relative",
        }}
      >
        <div style={{}} className="gold_color footer-contact">
          <h2>Contact</h2>
          <p style={{ fontWeight: "500" }}>
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
      <div style={{ background: "black", paddingTop: "0px" }}>
        <FooterText />

        {/* <img
          src="/svg/footer.svg"
          alt=""
          width={"100%"}
          height={"50%"}
          style={{ zIndex: "0" }}
        /> */}
      </div>
    </>
  );
}

export default Footer;
