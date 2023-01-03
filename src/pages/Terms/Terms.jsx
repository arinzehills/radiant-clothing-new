import React from "react";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero/Hero";
import "./Terms.css";

const Terms = () => {
  const homeData = {
    headline: "Radiant Clothing Terms of Service",
    description: "",
    // subdescription:
    //   "Content Writing, Social media graphics and Videos at scale monthly",
    img: "images/terms.png",
    imgalt1: "Conterize terms",
    // showButton: true,
    // buttonLabel: "More",
  };
  return (
    <>
      <Helmet>
        <title>Radiant Clothing - Terms & Condition</title>
        <meta
          name="description"
          content="Conterize document describing the terms of use of conterize platform for both business owners and freelancers"
        />
      </Helmet>
      <Hero {...homeData} />
      <div
        style={{
          textAlign: "left",
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue"         ',
        }}
        className={"terms_of_service"}
      >
        <h2
          style={{
            fontSize: "35px",
            color: "var(--dark-blue)",
          }}
        >
          {" "}
          TERMS AND CONDITION:
        </h2>
        <span style={{ fontSize: "20px" }} className={"italics"}>
          Last updated 4th January, 2023
        </span>
        <h2> 1.Introduction:</h2>
        <p>
          These terms and conditions (the "Terms") apply to the use of the
          website located at www.radiantclothings.com and the purchase and sale
          of products through the Website. By accessing or using the Website,
          you agree to be bound by these Terms. If you do not agree to all of
          these Terms, do not use the Website.
        </p>
        <h2>2.Changes to the Terms:</h2>
        <p>
          We reserve the right, at our sole discretion, to change, modify, add,
          or delete portions of these Terms at any time without further notice.
          If we do this, we will post the changes on this page and indicate the
          date these terms were last revised. Your continued use of the Website
          after any such changes constitutes your acceptance of the new Terms.
        </p>
        <h2>3.Eligibility:</h2>
        <p>
          The Website is intended for users who are at least 18 years old. If
          you are under 18 years of age, you may not use the Website. By using
          the Website, you represent and warrant that you are at least 18 years
          old and that you have the legal capacity to enter into a contract.{" "}
        </p>
        <p>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Site (or
          any portion thereof).
        </p>
        <h2>4.Privacy:</h2>
        <p>
          Our privacy policy, which sets out how we will use your information,
          can be found at
          https://www.freeprivacypolicy.com/live/2455e54f-e404-4c93-b982-4bbf2dc72bf1.
          By using the Website, you consent to the processing described therein
          and warrant that all data provided by you is accurate.
        </p>
        <h2>5.Intellectual Property:</h2>
        <p>
          The content of the Website, including but not limited to text,
          graphics, images, logos, and software, is the property of Radiant
          Clothing or its licensors and is protected by copyright and other
          intellectual property laws. You may not use any content on the Website
          for any commercial purpose without the express written consent of
          Radiant Clothing.
        </p>
        <h2>6.Product Information:</h2>
        <p>
          We have made every effort to display as accurately as possible the
          colors and images of our products that appear on the Website. However,
          we cannot guarantee that the display of colors on your computer
          monitor will be accurate. We reserve the right to modify the products
          and prices described on the Website at any time without notice.
        </p>
        <h2>7.Ordering and Payment:</h2>
        <p>
          All orders are subject to acceptance and availability. We reserve the
          right to refuse any order that does not comply with our policies.
          Payment must be received in full before any order will be shipped.
        </p>
        <h2>8.Shipping and Delivery:</h2>
        <p>
          We will make every effort to ship orders within 7 business days of
          receiving payment. However, we cannot guarantee delivery dates and
          will not be held responsible for delays caused by unforeseen
          circumstances or events beyond our control.
        </p>
        <h2>9.Returns and Refunds:</h2>
        <p>
          We will accept returns of products that are defective or damaged upon
          delivery. Please contact us within 10 days of receiving your order if
          you wish to return a defective or damaged product. We will issue a
          full refund for the price of the product, but we will not refund any
          shipping charges.
        </p>
        <h2>10.Disclaimer:</h2>
        <p>
          The Website and the products offered on the Website are provided on an
          "as is" and "as available" basis. We make no representations or
          warranties of any kind, express or implied, as to the operation of the
          Website or the information, content, materials, or products included
          on the Website. We will not be liable for any damages of any kind
          arising from
        </p>
        <div
          style={{ fontStyle: "italic", textDecoration: "none" }}
          // className="italics"
        >
          Radiant Clothing Ltd<br></br>
          _________________<br></br>
          Phone:<a href="tel:+91 9984924444">+91 9984924444</a>
          <br></br>
          <a href="mailto:info@radiantclothings.com">
            info@radiantclothings.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Terms;
