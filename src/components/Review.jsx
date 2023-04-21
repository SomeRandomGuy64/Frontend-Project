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
    if (disableDownButton) {
      api.patch2Votes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes + 2);
        setDisableUpButton(true);
        setDisableDownButton(false);
      });
    } else if (!disableDownButton) {
      api.patchVotes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes + 1);
        setDisableUpButton(true);
        setDisableDownButton(false);
      });
    }
  };
  
  const handleDownvote = (review_id) => {
    if (disableUpButton) {
      api.patch2DownVotes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes - 2);
        setDisableDownButton(true);
        setDisableUpButton(false);
      });
    } else if (!disableUpButton) {
      api.patchDownVotes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes - 1);
        setDisableDownButton(true);
        setDisableUpButton(false);
      });
    }
  };
  
  const handleRemoveVote = (review_id) => {
    if (disableDownButton === true) {
      api.patchVotes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes + 1);
        setDisableDownButton(false);
        setDisableUpButton(false);
      });
    } else if (disableUpButton === true) {
      api.patchDownVotes(review_id).then(() => {
        setLocalVotes((currVotes) => currVotes - 1);
        setDisableDownButton(false);
        setDisableUpButton(false);
      });
    }
  };

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
      <button
        disabled={disableUpButton}
        onClick={() => {
          handleUpvote(review.review_id);
        }}
      >
        Upvote!
      </button>
      <button
        onClick={() => {
          handleRemoveVote(review.review_id);
        }}
      >
        Remove vote!
      </button>
      <button
        disabled={disableDownButton}
        onClick={() => {
          handleDownvote(review.review_id);
        }}
      >
        Downvote!
      </button>
      <p>Comment count: {review.comment_count}</p>
      <br></br>
      <h3>Comments: </h3>
      <Comments />
    </div>
  );
}

export default Review;