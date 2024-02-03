import { myAxios } from "./helper"

//Service for creating new movie
export const createNewMovie = (movie) => {
  return myAxios.post("/movies", movie).then(res => res.data);
}


//add movie photo
export const addMovieImage = (image, movieId) => {
  const formData = new FormData();
  formData.append("image", image);
  return myAxios.post("/movies/image/upload/" + movieId, formData).then(res => res.data);
}


//get all movies
export const getAllMovies = () => {
  return myAxios.get("/movies").then(res => res.data);
}


//get movie by id
export const getMovie = (movieId) => {
  // console.log(id);
  return myAxios.get(`/movies/id/${movieId}`).then(res => res.data);
}

//search movies
export const searchMovies = (input => {
  return myAxios.get(`/movies/search/${input}`).then(res => res.data)
})


//delete movie
export const deleteMovie = (movieId) => {
  return myAxios.delete(`/movies/${movieId}`).then(res => res.data);
}

//update movie
export const updateMovie = (movie, movieId) => {
  return myAxios.put(`/movies/${movieId}`, movie).then((response) => response.data);
}