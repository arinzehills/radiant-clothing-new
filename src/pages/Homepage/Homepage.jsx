import React from "react";
import Featured from "../../components/Featured/Featured";
import Skills from "../../components/Featured/Featured";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ImageSlider from "../../components/HeroSlider/ImageSlider";

const Homepage = () => {
  const homeData = {
    headline: "Arinze Chris Hills",
    description:
      "Buy energy gives you the freedom to buy energy units" +
      " in an easier,better, smarter and more secure way " +
      "from the confort of your home",
    showButton: true,
    buttonLabel: ["Sign up", "Buy units"],
    buttonLinks: ["/register", "/buyunits"],
    img: "svg/slantedhomeimg.svg",
    imgStart: "",
    alt1: "da",
    alt2: "da",
  };
  const slides = [
    {
      title: "Radiant Clothin ",
      description: "the best e-shop,makes u glow",
      img: "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786719/cld-sample-5.jpg",
    },
    {
      title: "Shopping the best way you can",
      description: "Radiant allows you to shop\nfrom the comforts of you home",
      img: "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786717/cld-sample.jpg",
    },
    {
      title: "Best way to Shop\n Jeweries",
      description: "We sell all kinds of laptops, iphone and many IT equipment",
      img: "https://res.cloudinary.com/djsk1t9zp/image/upload/v1668862268/successful-young-businesswoman-shaking-hand-male-coworker_u2nbgp.jpg",
    },
  ];
  return (
    <>
      {/* <HeroSlider /> */}
      <ImageSlider slides={slides} />
      <div style={{ marginTop: "12rem" }}></div>
      <Featured />
    </>
  );
};

export default Homepage;
