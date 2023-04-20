import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.js";
import "./Comments.css";
import CommentCard from "./CommentCard.jsx";

function Comments() {
  const { review_id } = useParams();
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    api.fetchCommentsByReviewId(review_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!comments) {
    return <p>no comments found</p>;
  }

  return (
    <div className="Comments">
      <ul>
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            body={comment.body}
            review_id={comment.review_id}
            author={comment.author}
            votes={comment.votes}
            created_at={comment.created_at}
          />
        ))}
      </ul>
    </div>
  );
}

export default Comments;
