import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.js";
import Comments from "./Comment.jsx";

function Review() {
  const { review_id } = useParams();
  const [localVotes, setLocalVotes] = useState(0);
  const [disableUpButton, setDisableUpButton] = useState(false);
  const [disableDownButton, setDisableDownButton] = useState(false);
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

  const handleUpvote = (review_id) => {
    setDisableUpButton(true);
    setDisableDownButton(false);
    setLocalVotes((currVotes) => {
      return currVotes + 1
    })
    api.patchVotes(review_id);
  }

  const handleDownvote = (review_id) => {
    setDisableDownButton(true);
    setDisableUpButton(false);
    setLocalVotes((currVotes) => {
      return currVotes - 1
    })
    api.patchDownVotes(review_id);
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
      <p>Votes: {review.votes + localVotes}</p>
      <button disabled={disableUpButton} onClick={() => {handleUpvote(review.review_id)}}>Upvote!</button>
      <button disabled={disableDownButton} onClick={() => {handleDownvote(review.review_id)}}>Downvote!</button>
      <p>Comment count: {review.comment_count}</p>
      <br></br>
      <h3>Comments: </h3>
      <Comments/>
    </div>
  );
}

export default Review;
