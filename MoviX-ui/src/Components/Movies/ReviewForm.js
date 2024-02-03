import React, { useState } from 'react'
import '../../Static/Styles/MovieStyles/MovieReviews.css'
import FormValidationError from '../FormValidationError';
import { Button } from 'reactstrap';

export default function ReviewForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = ""
}) {



  const [text, setText] = useState(initialText);
  const [newReviewErr, setNewReviewErr] = useState({ isValid: null })


  const textChangeHandler = (event => {

    setText(event.target.value);
  })


  const onSubmit = (event) => {

    event.preventDefault();

    if (text.length === 0) {
      setNewReviewErr({ isValid: false, message: ["Review must not be empty"] });
      return;
    }



    handleSubmit(text);
    setText("");
    setNewReviewErr({ isValid: null })
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <textarea
          className="review-form-textarea"
          value={text}
          placeholder='Add your review here.....'
          onChange={textChangeHandler}
        />
        {newReviewErr.isValid === false && <FormValidationError messages={newReviewErr.message} />}
        <div className='review-form-btn'>
          <Button color='primary'>
            {submitLabel}
          </Button>
          {hasCancelButton && (
            <Button color='danger'
              className='mx-1'
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </div>


      </form>

    </React.Fragment>

  )
}
