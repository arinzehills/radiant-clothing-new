import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Button } from "../Button/Button";
import "./cssStyles.css";

const HeroSlider = () => {
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
      <div className="slide-body">
        <Slider autoplay={500} infinite={true}>
          {slides.map((slide, index) => (
            <div key={index} className={"class_justify_contents_column"}>
              <div className="outer">
                <h1>{slide.title}</h1>
                <Button
                  buttonColor={"black"}
                  buttonStyle={"btn--outline"}
                  isCircular="true"
                >
                  Start Shopping
                </Button>
              </div>
              <div className="inner">
                <p>{slide.description}</p>
              </div>

              <div className="slider_img">
                <img src={slide.img} alt="" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HeroSlider;
