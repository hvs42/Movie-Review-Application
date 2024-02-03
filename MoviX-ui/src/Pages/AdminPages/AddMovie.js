import React from 'react'
import MovieForm from '../../Components/Movies/MovieForm'
import { createNewMovie } from '../../Services/MovieServices'

export default function AddMovie() {


  const addMovieHandler = (movie) => {
    return createNewMovie(movie).then(res => res);
  }


  return (
    <div>
      <MovieForm submitMovie={addMovieHandler} />
    </div>
  )
}
