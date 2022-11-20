import React from "react";
import Featured from "../../components/Featured/Featured";
import Skills from "../../components/Featured/Featured";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

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
  return (
    <>
      <div style={{ marginTop: "12rem" }}></div>
      <HeroSlider />
      <Featured />
    </>
  );
};

export default Homepage;
