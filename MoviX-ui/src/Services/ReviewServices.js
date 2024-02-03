import { myAxios } from "./helper"

export const getAllReviewsOfMovie = (movieId) => {
    return myAxios.get(`/movies/${movieId}/reviews`).then(res => res.data);
}


export const createNewReview = (movieId, userId, reviewText) => {
    const review = { reviewContent: reviewText };
    return myAxios.post(`/movies/${movieId}/user/${userId}/reviews`, review).then(res => res.data);
}


export const updateReview = (reviewId, reviewContent) => {
    return myAxios.put(`/movies/reviews/${reviewId}`, reviewContent).then(res => res.data);
}

export const deleteReview = (reviewId) => {
    return myAxios.delete(`/movies/reviews/${reviewId}`).then(res => res.data);
}