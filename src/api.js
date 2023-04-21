import axios from "axios";

const baseUrl = "https://faizan-backend-project.onrender.com/api/";

export const fetchReviews = () => {
  return axios.get(`${baseUrl}reviews`).then(({ data }) => {
    return data.reviews;
  });
};

export const fetchReviewById = (review_id) => {
  return axios.get(`${baseUrl}reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const fetchCommentsByReviewId = (review_id) => {
  return axios
    .get(`${baseUrl}reviews/${review_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const patchVotes = (review_id) => {
  return axios
    .patch(`${baseUrl}reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};

export const patchDownVotes = (review_id) => {
  return axios
    .patch(`${baseUrl}reviews/${review_id}`, { inc_votes: -1 })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
}
