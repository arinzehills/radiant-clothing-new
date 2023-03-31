import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Skelton from "../../../components/LazyLoader/Skelton";
import Reviews from "../../../components/Reviews/Reviews";
import ProductImages from "../../../components/ProductImages/ProductImages";
import useFetch from "../../../useFetch";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";
import ProductDetail from "../../../components/Featured/ProductDetail";
import useToken from "../../../useToken";
import axios from "axios";

const AdminProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useToken();
  const params = useParams();
  var formatParam = params.product.split("-").pop();
  let product_name = params.product.split("-")[0];

  const {
    data: product,
    loading: loadingProduct,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProduct",
    fetchParamData: { id: formatParam },
    secondParam: loading === true && loading,
  });

  const deleteReview = async (review) => {
    console.log("delete Review Hitted at front end");
    setLoading(true);
    try {
      const saveUrl = `${window.baseUrl}admin/deleteReview?token=${token}`;
      console.log(review);
      const { data } = await axios.post(saveUrl, {
        ratedOn: review.reviewOn,
        product_id: product._id,
      }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        // handleClick={handleClick}
        pageTitle={`Product Detail>> ${product_name}`}
      />
      {loadingProduct ? (
        <div className="centerClass withStart withColumn">
          <div className="centerClass withStart withGap">
            <Skelton height={"300px"} width={"350px"} />
            <div className="centerClass withColumn withGap">
              <Skelton height={"80px"} width={"350px"} />
              <Skelton height={"50px"} width={"350px"} />
              <Skelton height={"30px"} width={"350px"} />
            </div>
          </div>
          <Skelton height={"100px"} width={"80vw"} />
          <Skelton height={"100px"} width={"80vw"} />
          <Skelton height={"100px"} width={"80vw"} />
        </div>
      ) : (
        <div>
          <ProductDetail
            prd={product}
            deleteReview={deleteReview}
            loadingDelete={loading}
          />
          {/* <ProductImages images={product?.images} />
          <div style={{ padding: "2rem" }}>
            <h2>Product Reviews</h2>
            <Reviews reviews={product?.reviews} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default AdminProductDetail;
