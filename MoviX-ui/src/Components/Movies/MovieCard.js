import React from 'react'
import { Icon } from 'semantic-ui-react'
import { BASE_URL } from '../../Services/helper'
import '../../Static/Styles/MovieStyles/MovieCard.css'
import movieImg from '../../Static/Images/MovieImages/movie.png'

export default function MovieCard({ movie, onClick }) {
  // console.log(movieId);


  console.log(movie);

  return (
    // <React.Fragment>
    <div className='mymoviecard' onClick={() => onClick(movie.movieId)}>
      {/* <p style={{color:'red'}}>Movie Name</p> */}
      {movie.imageUrl === null ? <img
        alt="Sample"
        src={movieImg}
        className='movie-card-pic'
      /> : <img
        alt="Sample"
        src={BASE_URL + "/movies/image/" + movie.movieId}
        className='movie-card-pic'
      />}

      <div className="movie-card-details">
        <h2 className="movie-card-title">{movie.movieName.length > 15 ? movie.movieName.substring(0, 15) + "...." : movie.movieName}</h2>
        <p className="movie-card-director">Director : {movie.director}</p>
        <p className='movie-card-synopsis'>Synopsis : {movie.synopsis.length > 150 ? movie.synopsis.substring(0, 150) + "...." : movie.synopsis}</p>
        <p className="movie-card-rating"><Icon name='star' color='yellow' />{movie.rating.rating}/10</p>
      </div>

    </div>
    // </React.Fragment>
  )
}
