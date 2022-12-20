import React from "react";
import Hero from "../../components/Hero/Hero";

const Categorypage = () => {
  const homeData = {
    headline:
      "Multiple Content Creation Services" + " with only 1 subscription.",
    description:
      "We are a power house for on-demand content creation for businesses, startups and agencies.  " +
      "From content writing, graphics to video creation, your business need no other content creation " +
      "service. Power, automate and scale your entire content marketing with one flat monthly subscription.",
    img: "images/multiplecontentcreation.jpg",
    withBg: true,
    showButton: true,
    buttonLabel: "See all list of our services",
    imgStart: "start",
  };
  return (
    <div>
      <Hero
        {...homeData}
        bgheight="450px"
        bgColor="#31A7FE"
        marginfrBg="-3rem"
        btnWidth="250px"
        buttonLink="/contenttypes"
      />
    </div>
  );
};

export default Categorypage;
