import { Link } from "react-router-dom";

function ReviewCard({
  review_id,
  title,
  category,
  designer,
  owner,
  review_body,
  review_img_url,
  created_at,
  votes,
  comment_count,
}) {
  return (
    <div className="ReviewCard">
      <li  key={review_id}>
        <Link to={`/reviews/${review_id}`}>
          <h2>{title}</h2>
        </Link>
        <h3>{category}</h3>
        <h3>Owner: {owner}</h3>
        <img src={review_img_url} alt={title} />
      </li>
    </div>
  );
}
export default ReviewCard;
