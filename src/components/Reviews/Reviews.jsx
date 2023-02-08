import React, { useState } from "react";
import ProfilePicsComponent from "../ProfilePicsComponent/ProfilePicsComponent";
import RatingStars from "./RatingStars";

const Reviews = ({ reviews }) => {
  const [rating, setRating] = useState({ ratings: reviews[0]?.ratings });
  console.log(reviews[0].ratings);
  return (
    <div style={{ background: "var(--grey2)", padding: "1rem" }}>
      <h3>Verified Customer Feedback</h3>
      <hr color="var(--grey)" />
      <div
        className="class_justify_contents_row"
        style={{
          justifyContent: "start",
          alignItems: "flex-start",
          maxWidth: "70vw",
          background: "white",
          gap: "1rem",
          padding: "1rem",
        }}
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
        <div
          style={{ gap: "1rem", alignItems: "flex-start" }}
          className={"class_justify_contents_column"}
        >
          <h5>Comments from Verified Purchases</h5>
          {reviews.map((review) => (
            <div style={{ gap: "1rem" }}>
              <RatingStars rating={review} />
              <p>{review.details}</p>
              <div className="class_justify_contents_row">
                <ProfilePicsComponent
                  name={review?.user_email}
                  isCirclular={true}
                  size="10px"
                  showCaret={false}
                  //   nameColor={"white"}
                />
                <p>{"21 - 1 - 1"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
