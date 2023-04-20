import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.js";
import Comments from "./Comment.jsx";

function Review() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    api.fetchReviewById(review_id).then((review) => {
      setReview(review);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (!review) {
    return <p>review not found</p>;
  }

  return (
    <div className="Review">
      <h2>{review.title}</h2>
      <h3>Category: {review.category}</h3>
      <h3>Designer: {review.designer}</h3>
      <h3>Owner: {review.owner}</h3>
      <p>{review.review_body}</p>
      <img src={review.review_img_url} alt={review.title} />
      <p>Created at: {review.created_at}</p>
      <p>Votes: {review.votes}</p>
      <p>Comment count: {review.comment_count}</p>
      <br></br>
      <h3>Comments: </h3>
      <Comments/>
    </div>
  );
}

export default Review;
