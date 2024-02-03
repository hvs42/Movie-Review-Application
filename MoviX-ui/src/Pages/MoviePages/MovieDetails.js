import React, { useContext, useState } from 'react'
import '../../Static/Styles/MovieStyles/MovieDetails.css'
import { Icon, Rating } from 'semantic-ui-react'
import MovieReviews from '../../Components/Movies/MovieReviews'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteMovie, getAllMovies, getMovie } from '../../Services/MovieServices'
import { BASE_URL } from '../../Services/helper'
import Footer from '../../Components/Footer'
import RatingModal from '../../Components/Movies/RatingModal'
import { LoginContext } from '../../Contexts/LoginContext'
import { addRatingByUser, getRatingByUserOnMovie } from '../../Services/RatingServices'
import { toast } from 'react-toastify'
import { Button } from 'reactstrap'
import { createNewReview, getAllReviewsOfMovie } from '../../Services/ReviewServices'
import movieImg from '../../Static/Images/MovieImages/movie.png'
import ReactPlayer from 'react-player'
import UpdateMovie from '../AdminPages/UpdateMovie'

export default function MovieDetails() {
  const param = useParams();
  // console.log(movieId);



  const loginContext = useContext(LoginContext);
  console.log(loginContext.loggedInUser);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [addRating, setAddRating] = useState(false);



  useEffect(() => {
    getMovie(param.movieId).then(res => {
      console.log(res);
      setMovie(res);
      return res;
    }).then((res) =>
      getRatingByUserOnMovie(res.movieId, loginContext.loggedInUser.userId).then(res => {
        setUserRating(res);
      })
    ).catch(err => {
      console.log(err);
    })
  }, [userRating])









  const addNewRating = (rating => {
    addRatingByUser(rating, movie.movieId, loginContext.loggedInUser.userId).then(res => {
      setUserRating(rating);
      toast.success("Rating is added successfully")
    })
  })





  const handleGiveRating = () => {
    if (loginContext.loggedInUser === null) {
      toast.error("Please login to add rating!!!");
      navigate("/login");
    } else {
      setAddRating(true);
    }
  }


  const closeModal = () => {
    setAddRating(false);
  }


  const deleteMovieHandler = () => {
    if (window.confirm("Are you sure to delete this movie permanently?")) {
      deleteMovie(movie.movieId).then(res => {
        toast.success("Movie is deleted successfully");
        navigate("/");
      }).catch(err => {
        console.log('error', err);
      })
    }
  }


  if (movie !== null) {
    return (
      <React.Fragment>
        <div className='details'>

          <div style={{ position: 'relative' }}>
            <p className='movie-title'>{movie.movieName}</p>
            <p className='movie-dir'>Director : {movie.director}</p>

            {loginContext.loggedInUser !== null ? (loginContext.loggedInUser.role === 1 && <Button color='primary' size='sm' onClick={() => navigate(`/admin/movies/update/${movie.movieId}`)} className='movie-update-btn'>Update Movie</Button>) : (<div></div>)}
            {loginContext.loggedInUser !== null ? (loginContext.loggedInUser.role === 1 && <Button color='danger' size='sm' onClick={deleteMovieHandler} className='movie-delete-btn'>Delete Movie</Button>) : (<div></div>)}

          </div>




          <iframe className="movie-trailer" src={`https://www.youtube.com/embed/${movie.videoUrl}?autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>




          <div className='main-section'>
            {movie.imageUrl === null ? <img
              alt="Sample"
              src={movieImg}
              className='movie-image'
            /> : <img
              alt="Sample"
              src={BASE_URL + "/movies/image/" + movie.movieId}
              className='movie-image'
            />}


            {/* Synopsis div */}


            <div className='movie-info'>
              <h1 className='syn'>Synopsis</h1>
              {movie.synopsis}
            </div>

            {/* Rating div */}
            <div className='rating-div'>

              <div className='movie-rating'>
                <p className='rating-title'>MOVIE RATING</p>

                <div className='rating'>
                  <Rating className='rating-icon' icon='star' defaultRating={1} maxRating={1} disabled size='massive' />
                  <p className='rating-val'>{movie.rating.rating}/10</p>
                </div>
                <p className='rated-people'>({movie.rating.numberofUsersRated})</p>

              </div>


              <div className='user-rating'>
                <p className='rating-title'>USER RATING</p>
                <div className='rating-btn' onClick={handleGiveRating}>
                  <Icon color='blue' name='star' size='big' className='rating-icon' />
                  <p className='rating-par'>{userRating === 0 ? "RATE" : `${userRating}/10`}</p>
                </div>
              </div>
            </div>
          </div>




          {/* Reviews */}
          <div className='movie-review-section'>
            <h1 style={{ color: '#ffffff' }}>Reviews</h1>
            <h3 style={{ color: '#ffffff' }}>Add a review</h3>
            <MovieReviews movieId={movie.movieId} />
          </div>



          {/* Rating module */}
          {addRating === true && <RatingModal closeModal={closeModal} addRating={addNewRating} userRating={userRating} />}

        </div>
        <Footer />

      </React.Fragment >
    )
  }
}
