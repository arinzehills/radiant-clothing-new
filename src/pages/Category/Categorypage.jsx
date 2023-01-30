import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductListItem from "../../components/Featured/ProductListItem";
import GradientHeaders from "../../components/GradientHeaders/GradientHeaders";
import Hero from "../../components/Hero/Hero";
import useFetch from "../../useFetch";

const Categorypage = () => {
  const { category } = useParams();
  const {
    data: categoriesData,
    loadingCategory,
    errorCategory,
  } = useFetch({
    url: window.baseUrl + "admin/getCategories",
    // secondParam: activeRow,
  });
  const {
    data: productsData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });

  const homeData = {
    headline: category,
    description:
      "We are a power house for on-demand content creation for businesses, startups and agencies.  " +
      "From content writing, graphics to video creation, your business need no other content creation " +
      "service. Power, automate and scale your entire content marketing with one flat monthly subscription.",
    //this filers out the product that maps the category
    img:
      "/images/straight-suit.jpeg" ??
      categoriesData?.categories.filter((cat) => cat.category === category)[0]
        ?.image,
    smallImage: "/svg/twocircle.svg",
    withBg: true,
    // showButton: true,
    buttonLabel: ["Shop", "back to home"],
    imgStart: "start",
  };
  const [products, setProducts] = useState([]);

  !loading &&
    productsData?.products.forEach((product, index) => {
      product.image = product.images[0];
    });
  !loadingCategory &&
    categoriesData?.categories.forEach((cat, index) => {
      // cat.image = cat.images[0];
      console.log(cat.category);
    });
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
      {/* where the products/content starts */}
      <div
        style={{
          marginTop: "-1rem",
          width: "100vw",
          zIndex: 11,
          position: "absolute",
        }}
      >
        <GradientHeaders
          fontSize={"4.5vw"}
          text={"Featured"}
          subHeader={"."}
          uppercase={true}
          showSubHeader={true}
        />
      </div>
      <ProductListItem
        // colorClass={productsSet.colorClass}
        // imgSrc={productsSet.image}
        loading={loading}
        products={productsData?.products.filter(
          (product) => product.category === category //this filers out the product that maps the category
        )}
      />
    </div>
  );
};

export default Categorypage;
