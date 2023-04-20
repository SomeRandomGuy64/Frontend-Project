import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import * as api from "../api.js";
import "./Reviews.css";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.fetchReviews().then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, [setReviews]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="ReviewList">
        <ul>
          {reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              review_id={review.review_id}
              title={review.title}
              category={review.category}
              designer={review.designer}
              owner={review.owner}
              review_body={review.review_body}
              review_img_url={review.review_img_url}
              created_at={review.created_at}
              votes={review.votes}
              comment_count={review.comment_count}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReviewList;