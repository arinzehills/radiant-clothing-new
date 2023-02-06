import React, { useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { Button } from "../Button/Button";
import InputField from "../Inputfield/InputField";
import TextArea from "../Inputfield/TextArea";

const AddReview = () => {
  const [rating, setRating] = useState({ rate: 0 });
  const ratingIcon = [
    { rate: 1 },
    { rate: 2 },
    { rate: 3 },
    { rate: 4 },
    { rate: 5 },
  ];
  return (
    <div style={{ padding: "3rem" }} className="class_justify_contents_column">
      <div
        className="class_justify_contents_row withGap"
        style={{ marginBottom: "1rem" }}
      >
        {ratingIcon.map((rate, index) => (
          <div>
            <AiTwotoneStar
              size={"25px"}
              color={rating.rate >= rate.rate && "var(--light-gold)"}
              className={"product-item-icon"}
              onClick={() => setRating({ rate: index + 1 })}
            />
            <pre className="showTip">
              {index === 0
                ? "it's bad"
                : index === 1
                ? "it's fair"
                : index === 2
                ? "its good"
                : index === 3
                ? "its good"
                : "Excellent"}
            </pre>
          </div>
        ))}
      </div>
      <div
        className="class_justify_contents_column"
        style={{ alignItems: "start" }}
      >
        <TextArea
          label={"Enter product description"}
          style={{ width: "100%" }}
          name={"description"}
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          //   value={formValues.description}
        />
        <h5 style={{ lineHeight: 0 }}>Review detail</h5>
      </div>
      <Button
        buttonColor={"orange"}
        children={"Rate item"}
        style={{ color: "white", height: "40px", width: "100px" }}
        onClick={() => setOpenModal(true)}
      />
    </div>
  );
};

export default AddReview;
