import React, { useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import useToken from "../../useToken";
import { Button } from "../Button/Button";
import handleNot from "../HandleNotification/HandleNot";
import InputField from "../Inputfield/InputField";
import TextArea from "../Inputfield/TextArea";
import RatingStars from "./RatingStars";

const AddReview = ({ setOpenModal, product_id }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState({ ratings: 0 });
  const { token, setToken } = useToken();
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  console.log(product_id);
  const ratingIcon = [
    { ratings: 1 },
    { ratings: 2 },
    { ratings: 3 },
    { ratings: 4 },
    { ratings: 5 },
  ];
  const rateItem = async () => {
    setLoading(true);
    const data = {
      rate: rating.ratings,
      detail: detail,
      product_id: product_id,
    };
    const url = window.baseUrl + "admin/reviewProduct?token=" + token;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["success"] === true) {
          handleNot({
            title: "Success",
            message: data["message"] ?? "Your request have been Placed!",
            backgroundColor: "var(--success)",
          });
          setOpenModal(false);
        } else {
          const error = data["message"];
          console.log(error);
          setError(error);
          setLoading(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="class_justify_contents_column">
      <RatingStars setRating={setRating} rating={rating.ratings} />
      <div
        className="class_justify_contents_column"
        style={{ alignItems: "start" }}
      >
        <h5 style={{ lineHeight: 0 }}>Review detail</h5>
        <TextArea
          label={"Enter product description"}
          style={{ width: "100%" }}
          name={"description"}
          onHandleChange={(e) => setDetail(e.target.value)}
          value={detail}
        />
        <p style={{ color: "red", lineHeight: 0 }}>{error}</p>
      </div>
      <Button
        buttonColor={"orange"}
        children={"Rate item"}
        style={{ color: "white", height: "40px", width: "100px" }}
        onClick={() =>
          !detail
            ? setError("Enter something")
            : rating.rate === 0
            ? setError("Rate with a star")
            : rateItem()
        }
      />
    </div>
  );
};

export default AddReview;
