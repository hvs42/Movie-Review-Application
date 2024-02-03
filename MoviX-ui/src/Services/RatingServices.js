import { myAxios } from "./helper"

export const addRatingByUser = (rating,movieId,userId)=>{  
    return myAxios.post(`/ratings/user/${userId}/movie/${movieId}`,{rating : rating}).then(res=>res.data);
}


export const getRatingByUserOnMovie = (movieId,userId)=>{
    return myAxios.get(`/ratings/user/${userId}/movie/${movieId}`).then(res=>res.data);
}