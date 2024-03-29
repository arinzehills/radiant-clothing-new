import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import AnimatedModal from "../AnimatedModal/AnimatedModal";

export const ProductImageSlider = ({ images, currentImage, hoverHandler }) => {
  return (
    <div
      style={
        {
          // height: window.innerWidth < 700 && "10vh",
          // background: "black",
        }
      }
    >
      <div
        style={{ position: "absolute" }}
        className="class_justify_contents_column"
      >
        {images.map((image, i) => (
          <div
            style={{
              border: currentImage === image && "1px solid var(--light-orange)",
            }}
            key={i}
            onMouseOver={() => hoverHandler(image, i)}
          >
            <img src={image} alt="" height={"60px"} width="60px" />
          </div>
        ))}
      </div>
      <img
        src={currentImage}
        alt=""
        height={"100%"}
        style={{
          minHeight: window.innerWidth < 700 ? "100px" : "800px",
          objectFit: "contain",
          marginLeft: "-10px",
        }}
        width={window.innerWidth < 700 ? "100%" : "100%"}
      />
    </div>
  );
};
const ProductImages = ({ images, isAdmin }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showFullImage, setShowFullImage] = useState(false);
  const hoverHandler = (image, i) => {
    setCurrentImage(image);
  };
  return (
    <div id="product-images" style={{ display: "flex", gap: "1rem" }}>
      <AnimatedModal
        openModal={showFullImage}
        setOpenModal={setShowFullImage}
        style={{ width: window.innerWidth < 700 ? "70vh" : "100vh" }}
        modalHeight={window.innerWidth < 700 ? "70vh" : "100vh"}
        bkdropclassName={"full_backdrop"}
      >
        <ProductImageSlider
          images={images}
          currentImage={currentImage}
          hoverHandler={hoverHandler}
        />
      </AnimatedModal>

      <div id="vertical-images" className="class_justify_contents_column">
        {images.map((image, i) => (
          <div
            style={{
              border: currentImage === image && "1px solid var(--light-orange)",
            }}
            key={i}
            onMouseOver={() => hoverHandler(image, i)}
          >
            <img
              src={image}
              alt=""
              height={window.innerWidth < 700 ? "80px" : "100px"}
              width={window.innerWidth < 700 ? "60px" : "80px"}
            />
          </div>
        ))}
      </div>
      <div
        id="product-image"
        onClick={() => setShowFullImage(true)}
        style={{ cursor: "zoom-in" }}
      >
        <img
          src={currentImage}
          alt=""
          style={{
            height: window.innerWidth < 700 ? 250 : isAdmin ? 250 : 600,
            width: window.innerWidth < 700 ? 200 : isAdmin ? 350 : 500,
          }}
        />
      </div>
    </div>
  );
};

export default ProductImages;
