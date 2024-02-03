import React from 'react'
import { FormFeedback } from 'reactstrap'

export default function FormValidationError(props) {

  console.log(props.messages);

  return (
    <React.Fragment>
      {props.messages.map(message => {
        return (
          <FormFeedback tag='li' style={{
            fontSize: '12px',
            padding: '3px',
            color: 'red',
            display: 'block'
          }}>{message}</FormFeedback>
        )
      })}
    </React.Fragment>
  )
}