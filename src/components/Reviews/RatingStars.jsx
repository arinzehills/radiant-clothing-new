import React from "react";
import { AiTwotoneStar } from "react-icons/ai";

const RatingStars = ({ setRating, rating }) => {
  const ratingIcon = [
    { rate: 1 },
    { rate: 2 },
    { rate: 3 },
    { rate: 4 },
    { rate: 5 },
  ];
  return (
    <div>
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
    </div>
  );
};

export default RatingStars;
