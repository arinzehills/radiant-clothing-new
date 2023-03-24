import React, { useEffect, useState } from "react";
import NoDataFound from "../NoDataFound/NoDataFound";
import ProfilePicsComponent from "../ProfilePicsComponent/ProfilePicsComponent";
import RatingStars from "./RatingStars";
import moment from "moment";

const Reviews = ({ reviews }) => {
  const [rating, setRating] = useState();
  useEffect(() => {
    if (!Array.isArray(reviews) || reviews.length <= 0) {
      // if is not an array return null
      console.log("if is not an array return null");
      return null;
    } else {
      setRating({ ratings: reviews[0]?.ratings });
    }
  }, []);
  const calcTotalReview = (reviews) => {
    let totalReview = 0;
    reviews.forEach((review) => {
      totalReview = totalReview + eval(review.ratings);
    });
    let reviewPercentage = totalReview / reviews?.length;
    return reviewPercentage;
  };
  return (
    <div style={{ background: "var(--grey2)", padding: "1rem" }}>
      <h3>Verified Customer Feedback</h3>
      <hr color="var(--grey)" />
      <div
        className="class_justify_contents_row"
        style={{
          justifyContent: "start",
          alignItems: "flex-start",
          maxWidth: window.innerWidth < 710 ? "95vw" : "70vw",
          background: "white",
          gap: "1rem",
          padding: "1rem",
          flexDirection: window.innerWidth < 710 && "column",
        }}
      >
        {/* for rating images */}
        <div>
          <h5>Verified Ratings({reviews?.length ?? "0"})</h5>
          <div
            style={{
              background: "var(--grey2)",
              minHeight: "400px",
              padding: "2rem",
              flexDirection: "column",
            }}
            className="centerClass"
          >
            <h3>
              {reviews == undefined || reviews?.length == 0
                ? ""
                : `${calcTotalReview(reviews)}/5`}
            </h3>
            <RatingStars
              rating={
                reviews == undefined || reviews?.length == 0
                  ? "0"
                  : calcTotalReview(reviews) + 0.5
              }
              setRating={setRating}
            />
            <p>
              {reviews === undefined || reviews?.length === 0
                ? "0 "
                : reviews?.length + " "}
              verified ratings
            </p>
          </div>
        </div>
        {/* rating details */}
        <div
          style={{
            gap: "1rem",
            alignItems: "flex-start",
            width: "100%",
          }}
          className={"class_justify_contents_column"}
        >
          <h5>Comments from Verified Purchases</h5>
          {reviews === undefined || reviews?.length === 0 ? (
            <NoDataFound message={"No reviews yet for this product"} />
          ) : (
            reviews?.map((review) => (
              <div style={{ gap: "1rem" }} key={review.ratings}>
                <RatingStars rating={review.ratings} />
                <p>{review.details}</p>
                <ProfilePicsComponent
                  name={review?.user_name ?? review?.user_email}
                  // isCirclular={true}
                  size="120px"
                  showCaret={false}
                  userType={
                    moment(review.reviewOn).format("DD-MMM-YYYY") ??
                    '"21 - 1 - 1"'
                  }
                  //   nameColor={"white"}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
