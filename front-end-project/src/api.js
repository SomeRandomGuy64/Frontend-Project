import axios from "axios";

const baseUrl = "https://faizan-backend-project.onrender.com/api/";

export const fetchReviews = () => {
  return axios.get(`${baseUrl}reviews`).then(({ data }) => {
    return data.reviews;
  });
};

export const fetchReviewById = (review_id) => {
    return axios.get(`${baseUrl}reviews/${review_id}`).then(({data}) => {
        return data.review;
    })
}

export const fetchCommentsByReviewId = (review_id) => {
  return axios.get(`${baseUrl}reviews/${review_id}/comments`).then(({data}) => {
    return data.comments;
  })
}
