import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import '../../Static/Styles/MovieStyles/UserReviews.css'
import img from '../../Static/Images/UserImages/user.png'
import { BASE_URL } from '../../Services/helper';
import { getUserById } from '../../Services/UserService';
import ReviewForm from './ReviewForm';
import { Button } from 'reactstrap';
import { LoginContext } from '../../Contexts/LoginContext';

export default function UserReviews({
  activeReview,
  setActiveReview,
  deleteReview,
  updateReview,
  review
}) {

  const isEditing =
    activeReview &&
    activeReview.id === review.reviewId;


  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.loggedInUser;


  let canAct = false;

  if (currentUser !== null) {
    canAct = currentUser.userId === review.userId;
  }



  const [user, setUser] = useState(null);



  useEffect(() => {
    if (review.userId !== null) {
      console.log(review);
      getUserById(review.userId).then(res => {
        console.log(res);
        setUser(res);
      })
    }
  }, [])


  if (user !== null) {
    return (
      <Card className='review-list-card'>
        <CardHeader className='review-user-header'>
          {user.profileImage !== null ? <img src={`${BASE_URL}/users/image/${user.userId}`} className='review-user-img' alt="Actual" /> : <img src={img} className='review-user-img' alt='Default' />}
          <CardTitle className='review-user-title'>{user.name}</CardTitle>
          <div className='review-actions'>
            {canAct && (
              <Button color='primary' className='mx-2' onClick={() => { setActiveReview({ id: review.reviewId }) }}>Edit</Button>
            )}
            {canAct && (
              <Button color='danger' outline onClick={() => { deleteReview(review.reviewId) }}>Delete</Button>
            )}
          </div>

        </CardHeader>
        {!isEditing &&
          <CardBody className='review-card-content'>
            {review.reviewContent}
          </CardBody>
        }
        {isEditing && (
          <ReviewForm
            submitLabel="Update"
            hasCancelButton
            initialText={review.reviewContent}
            handleSubmit={(text) => { updateReview(text, review.reviewId) }}
            handleCancel={() => { setActiveReview(null) }} />)}
      </Card>
    )
  }
  else {
    return (
      <Card className='review-list-card'>
        <CardHeader className='review-user-header'>
          <img src={img} className='review-user-img' alt='Default' />
          <CardTitle className='review-user-title'>User Unavailable</CardTitle>

          <div className='review-actions'>
            {currentUser && currentUser.role === 1 && (
              <Button color='danger' outline onClick={() => { deleteReview(review.reviewId) }}>Delete</Button>
            )}
          </div>
        </CardHeader>
        <CardBody className='review-card-content'>
          {review.reviewContent}
        </CardBody>
      </Card>
    )
  }
}
