import React, { useEffect, useState, useContext } from 'react'
import '../../Static/Styles/MovieStyles/MovieReviews.css'
import UserReviews from './UserReviews'
import { Card, Container, Button } from 'reactstrap'
import '../../Static/Styles/MovieStyles/MovieReviews.css'
import { createNewReview, deleteReview, getAllReviewsOfMovie, updateReview } from '../../Services/ReviewServices'
import { LoginContext } from '../../Contexts/LoginContext'
import { toast, useToast } from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom'
import ReviewForm from './ReviewForm'
export default function Reviews({ movieId }) {

  const [reviews, setReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(null);




  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();


  console.log(reviews);

  useEffect(() => {
    getAllReviewsOfMovie(movieId).then(res => {
      setReviews(res);
    }).catch(err => {
      console.log(err);
    })
  }, []);






  const addReviewHandler = (reviewText) => {

    if (loginContext.loggedInUser === null) {
      toast.error("Please login to add review to a movie!!!");
      navigate("/login")
      return;
    }
    else {
      //add the review to backend database and refresh the page for rendering
      console.log(reviewText);
      createNewReview(movieId, loginContext.loggedInUser.userId, reviewText).then(res => {
        toast.success("Review is added successfully")
        setReviews(prevReviews => {
          return [...prevReviews, res];
        })
      }).catch(err => {
        toast.error(err)
      })
    }
  }

  const updateReviewHandler = (text, reviewId) => {
    updateReview(reviewId, { reviewContent: text }).then(res => {
      const updatedReviews = reviews.map(review => {
        if (review.reviewId === reviewId) {
          return review = { ...review, reviewContent: text };
        }
        return review;
      })
      setReviews(updatedReviews);
      setActiveReview(null);
    }).catch(err => {
      console.log(err);
    })
  }


  const deleteReviewHandler = (reviewId) => {
    if (window.confirm("Are you sure you want to remove review?")) {
      deleteReview(reviewId).then(() => {
        const updatedBackendComments = reviews.filter(
          (review) => review.reviewId !== reviewId
        );
        setReviews(updatedBackendComments);
      });
    }
  }


  return (
    <div>


      <ReviewForm submitLabel="Submit Review" handleSubmit={addReviewHandler} />



      <Container fluid className='review-card'>
        <h1 className='heading'>User reviews</h1>
        {reviews.map(review => {
          return <UserReviews
            key={review.reviewId}
            activeReview={activeReview}
            setActiveReview={setActiveReview}
            deleteReview={deleteReviewHandler}
            updateReview={updateReviewHandler}
            review={review} />
        }).reverse()}

      </Container>
    </div>
  )
}
