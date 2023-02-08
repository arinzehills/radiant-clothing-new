import React, { useState } from "react";
import RatingStars from "./RatingStars";

const Reviews = () => {
  const [rating, setRating] = useState({ rate: 0 });
  return (
    <div>
      <h3>Verified Customer Feedback</h3>
      <hr color="var(--grey)" />
      <div
        className="class_justify_contents_row"
        style={{ justifyContent: "space-around", alignItems: "start" }}
      >
        {/* for rating images */}
        <div>
          <h5>Verified Ratings(2)</h5>
          <div
            style={{
              background: "var(--grey2)",
              minHeight: "300px",
              flexDirection: "column",
            }}
            className="centerClass"
          >
            <h3>4.6/5</h3>
            <RatingStars rating={rating} setRating={setRating} />
            <p>12 verified ratings</p>
          </div>
        </div>
        {/* rating details */}
        <div>
          <h5>Comments from Verified Purchases</h5>
          <div>
            <RatingStars rating={rating} setRating={setRating} />
            <p>Comments</p>
            <div>10-12-2021 {"a@a.com"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
