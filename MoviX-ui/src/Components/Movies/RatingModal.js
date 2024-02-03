import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { Rating } from 'semantic-ui-react'
import '../../Static/Styles/MovieStyles/RatingModal.css'

export default function RatingModal(props) {

  const [rating, setRating] = useState(0);


  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll"
    };
  }, []);


  const givenRatingHandler = (e, { rating, maxRating }) => {
    setRating(rating);
  }




  const submitRatingHandler = (e) => {
    props.closeModal();
    props.addRating(rating);
    document.body.style.overflowY = "scroll"
  }


  return (
    <React.Fragment>
      <div className='model-wrapper' onClick={props.closeModal}></div>
      <Card className='rating-card'>
        <CardHeader tag="h2">Add rating here</CardHeader>
        <CardBody className='rating-body'>
          <Rating icon='star' maxRating={10} defaultRating={props.userRating !== 0 ? props.userRating : 1} onRate={givenRatingHandler} className='rating-stars' />
          <Button color='success' className='rating-button' outline onClick={submitRatingHandler}>Submit Rating</Button>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
