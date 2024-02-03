import React, { useEffect, useState } from 'react'
import FormValidationError from '../Components/FormValidationError';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { signUp } from '../Services/UserService';
import { LoginContext } from '../Contexts/LoginContext';
import UserForm from '../Components/Users/UserForm';
import Footer from '../Components/Footer';

export default function Signup() {


  const newUserSignupHandler = (userData) => {
    return signUp(userData);
  }


  return (
    <React.Fragment>
      <UserForm handleFormSubmit={newUserSignupHandler} />
      <Footer />
    </React.Fragment>
  )

}


