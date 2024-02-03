import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie, updateMovie } from '../../Services/MovieServices';
import { toast } from 'react-toastify';
import MovieForm from '../../Components/Movies/MovieForm';

export default function UpdateMovie() {


  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);


  useEffect(() => {
    getMovie(movieId).then(res => {
      setMovie(res);
    }).catch(err => {
      toast.error(err.message);
    })
  }, []);



  const updateMovieHandler = (movie) => {
    return updateMovie(movie, movieId).then(res => res);
  }




  if (movie !== null) {
    return (
      <MovieForm name={movie.movieName} dir={movie.director} video={movie.videoUrl} syn={movie.synopsis} update={true} submitMovie={updateMovieHandler} />
    )
  }
}
