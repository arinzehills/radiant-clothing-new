import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ slides, isNotMap, style, imageStyle, iconSize }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const delay = 2500;
  const nextSlide = () => {
    // if current is == the last value in d array set it back to zero(firstelement) else increase it
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    // if current is == the first value in d array set it last value else decrease it by one
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  if (!Array.isArray(slides) || slides.length <= 0) {
    // if is not an array return null
    return null;
  }

  useEffect(() => {
    // setTimeout(
    //   () =>
    //     setCurrent((prevIndex) =>
    //       prevIndex === length - 1 ? 0 : prevIndex + 1
    //     ),
    //   delay
    // );
    // return () => {};
  }, [current]);
  return (
    <section className="slider" style={style}>
      <Icon
        icon="material-symbols:arrow-back-ios"
        className="slider-arrow-left"
        onClick={prevSlide}
      />
      <Icon
        icon="material-symbols:arrow-forward-ios-rounded"
        className="slider-arrow-right "
        onClick={nextSlide}
      />
      {slides.map((slide, index) => (
        <div
          className={index === current ? "myslide myslide-active" : "myslide"}
          key={index}
        >
          {index === current && (
            <img
              src={isNotMap ? slide : slide.img}
              alt="slide image"
              style={imageStyle}
              className="slider-image"
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default ImageSlider;
