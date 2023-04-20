function CommentCard({
    comment_id,
    body,
    review_id,
    author,
    votes,
    created_at,
}) {
    return (
        <div className="CommentCard">
            <li key={comment_id}>
                <h3>Author: {author}</h3>
                <h3>{body}</h3>
                <h3>Votes: {votes}</h3>
                <h4>Date: {created_at}</h4>
                <br></br>
            </li>
        </div>
    )
}

export default CommentCard;