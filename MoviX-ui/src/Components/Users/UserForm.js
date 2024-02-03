import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import FormValidationError from '../FormValidationError';
import { toast } from 'react-toastify';
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { aboutValidaterHelper, emailValidaterHelper, imageValidaterHelper, nameValidaterHelper, passwordValidaterHelper } from '../../Utils/ValidationHelpers';

export default function UserForm(props) {


  const navigate = useNavigate();


  const loginContext = useContext(LoginContext);

  const user = props.user;


  //Declaring the state varibles
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [about, setAbout] = useState(user?.about || '');



  //Form submit is valid state variable
  const [isSubmitValid, setisSubmitValid] = useState(null);

  //Errors for respective fields with messages
  const [nameErr, setnameErr] = useState({
    isValid: null,
  });

  const [emailErr, setemailErr] = useState({
    isValid: null,
  });

  const [passwordErr, setpasswordErr] = useState({
    isValid: null,
  });

  const [aboutErr, setaboutErr] = useState({
    isValid: null
  });

  //handlers for changing state variables,whenever it is changed also it is validated

  //Name change handler
  const nameChangeHandler = (event) => {
    const userName = event.target.value;
    setName(userName);
    nameValidateHandler(userName);
  }

  //Email change Handler
  const emailChangeHandler = (event => {
    setEmail(event.target.value);
    const userEmail = event.target.value;
    emailValidateHandler(userEmail);
  })

  //Password change handler
  const passwordChangeHandler = (event => {
    setPassword(event.target.value);
    passwordValidateHandler(event.target.value);
  })

  //about change handler
  const aboutChangeHandler = (event => {
    setAbout(event.target.value);
    aboutValidateHandler(event.target.value);
  })


  //handling blurs
  const onNameBlurHandler = () => {
    nameValidateHandler(name);
  }

  const emailBlurHandler = () => {
    emailValidateHandler(email);
  }

  const passwordBlurHandler = () => {
    passwordValidateHandler(password);
  }

  const aboutBlurHandler = () => {
    aboutValidateHandler(about);
  }

  //validating name value in form
  const nameValidateHandler = (userName) => {
    const err = nameValidaterHelper(userName);
    setnameErr(err);
  }



  //Validating email value in form
  const emailValidateHandler = (userEmail) => {
    const err = emailValidaterHelper(userEmail);
    setemailErr(err)
  }

  //Validating Password
  const passwordValidateHandler = (userPassword) => {
    const err = passwordValidaterHelper(userPassword);

    setpasswordErr(err);
  }

  //validating about in form
  const aboutValidateHandler = (userAbout) => {
    const err = aboutValidaterHelper(userAbout);
    setaboutErr(err);
  }

  //whenever an error is introduced or removed the form submit error is then changed accordingly to facilitate submit
  useEffect(() => {
    if (nameErr.isValid && passwordErr.isValid && emailErr.isValid && aboutErr.isValid)
      setisSubmitValid(true);
    else
      setisSubmitValid(false);

  }, [nameErr, emailErr, passwordErr, aboutErr]);

  //Form is submitted and date is passed to server for backend validation and storage
  const submitFormHandler = (event => {
    event.preventDefault();

    //all the date is checked before submission
    nameValidateHandler(name);
    passwordValidateHandler(password);
    emailValidateHandler(email);
    aboutValidateHandler(about);


    // send date to server
    if (isSubmitValid === true) {

      props.handleFormSubmit({
        name: name,
        email: email,
        password: password,
        about: about,
      }).then(res => {


        console.log(res);
        //on successful registration
        console.log(res);
        if (!props.update) {
          toast("User is registered successfully, Time to login!")
          formResetHandler(event);

        }
        else {
          toast("User is updated Successfully");


        }
        console.log("Success Log");
        //on successful registration reset the form
      }).catch(rej => {
        //on unsuccessful registration
        console.log(rej);
        console.log("Error log");
        //if email is duplicate to some other user
        if (rej?.response?.status === 500) {
          toast.error(rej.response.data.message);
          setEmail('');
          setemailErr({ isValid: false, messages: [] });
          return;
        }
        //if some other error occurs
        toast.error("Form is invalid, Please give valid inputs !!!")
        serverValidateHandler(rej?.response?.data);
      })
    }
    else {
      //message if the inputs are not valid
      console.log("inputs are not valid");
      toast.error("Form is invalid, Please give valid inputs !!!")
    }

  })

  //form is reset
  const formResetHandler = (event => {
    event.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setAbout('')
    setnameErr({ isValid: null })
    setemailErr({ isValid: null })
    setpasswordErr({ isValid: null })
    setaboutErr({ isValid: null });
    setisSubmitValid(false)
  })


  //validations for fields with response coming from server
  const serverValidateHandler = (data => {
    if (data?.name) {
      setnameErr({ isValid: false, messages: [data?.name] })
    }

    if (data?.email) {
      setemailErr({ isValid: false, messages: [data?.email] })
    }

    if (data?.password) {
      setpasswordErr({ isValid: false, messages: [data?.password] })
    }

    if (data?.about) {
      setaboutErr({ isValid: false, messages: [data?.about] });
    }
  })

  return (
    <Container className='mt-3 signup-container'>

      <Row>
        <Col
          md={{
            offset: 3,
            size: 6
          }}
          sm="12">
          <Card outline color='dark'>

            <CardHeader className='text-center'>
              <h2>{(user && `Update User`) || (user || `Signup Page`)}</h2>
            </CardHeader>
            <CardBody>
              {/* Creating form */}
              <Form onSubmit={submitFormHandler} onReset={formResetHandler}>

                {/* Name field */}
                <FormGroup>
                  <Label for='name'>Name : </Label>
                  <Input id='name' type='text' placeholder='Enter your name here' value={name} onChange={nameChangeHandler} onBlur={onNameBlurHandler} valid={nameErr.isValid === true} invalid={nameErr.isValid === false} />
                  {nameErr.isValid === false && <FormValidationError messages={nameErr.messages} />}
                </FormGroup>


                {/* Email field */}
                <FormGroup>
                  <Label for='email'>Email : </Label>
                  <Input id='email' type='email' placeholder='Enter Email here' value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} valid={emailErr.isValid === true} invalid={emailErr.isValid === false} />
                  {emailErr.isValid === false && <FormValidationError messages={emailErr.messages} />}
                </FormGroup>

                {/* Password field */}
                <FormGroup>
                  <Label for='password'>Password : </Label>
                  <Input id='password' type='password' placeholder='Enter Password here' value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} valid={passwordErr.isValid === true} invalid={passwordErr.isValid === false} />
                  {passwordErr.isValid === false && <FormValidationError messages={passwordErr.messages} />}
                </FormGroup>

                {/* About field */}
                <FormGroup>
                  <Label for='desc'>Description : </Label>
                  <Input id='desc' type='textarea' placeholder='Enter Description here' style={{ height: '200px' }} value={about} onChange={aboutChangeHandler} onBlur={aboutBlurHandler} invalid={aboutErr.isValid === false} valid={aboutErr.isValid === true} />
                  {aboutErr.isValid === false && <FormValidationError messages={aboutErr.messages} />}
                </FormGroup>

                <Container className='text-center'>
                  <Button color='success' style={{ marginRight: '10px' }} type='submit'>Submit</Button>
                  <Button color='warning' type='reset'>Reset</Button>
                </Container>

              </Form>
            </CardBody>

          </Card>
        </Col>
      </Row>
    </Container>
  )
}
