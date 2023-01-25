import React from "react";
import Featured from "../../components/Featured/Featured";
import Skills from "../../components/Featured/Featured";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ImageSlider from "../../components/HeroSlider/ImageSlider";
import GradientText from "../../components/utilitiescomponent/GradientText";
import useFetch from "../../useFetch";

const Homepage = () => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getHomeimages",
  });
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
      title: "Radiant Clothing ",
      description: "the best e-shop,makes u glow",
      image:
        "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786719/cld-sample-5.jpg",
    },
  ];
  return (
    <>
      {/* <HeroSlider /> */}
      {loading ? (
        <div
          className="class_justify_contents_column"
          style={{
            maxHeight: "300px",
            height: "1000px",
            width: "100%",
            background: "black",
          }}
        >
          <GradientText
            text={"RADIANT CLOTHING"}
            style={{ lineHeight: 1, fontSize: "3vw", textAlign: "left" }}
          />
        </div>
      ) : (
        categoriesData?.images.length !== 0 && (
          <ImageSlider slides={categoriesData?.images} />
          // <div></div>
        )
      )}
      {/* <ImageSlider slides={slides} /> */}
      <div style={{ marginTop: "1rem" }} className="class_justify_contents_row">
        <img src="/images/freeshipping.png" width={"100%"} height="200px" />
      </div>
      <div style={{ marginTop: "12rem" }}></div>
      <Featured />
    </>
  );
};

export default Homepage;
