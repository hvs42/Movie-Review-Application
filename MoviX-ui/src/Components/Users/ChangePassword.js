import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import '../../Static/Styles/UserStyles/ChangePassword.css'
import { emailValidaterHelper, passwordValidaterHelper } from '../../Utils/ValidationHelpers';
import { LoginContext } from '../../Contexts/LoginContext';
import { changePassword, login } from '../../Services/UserService';
import FormValidationError from '../FormValidationError';
import { toast } from 'react-toastify';

export default function ChangePassword() {


  const [email, setemail] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [checkPassword, setcheckPassword] = useState('');


  const [isSubmitValid, setisSubmitValid] = useState(null);


  const loginContext = useContext(LoginContext);


  const [emailErr, setemailErr] = useState({
    isValid: null,
  });

  const [newPasswordErr, setnewPasswordErr] = useState({
    isValid: null,
  });

  const [checkPasswordErr, setcheckPasswordErr] = useState({
    isValid: null,
  });





  const emailChangeHandler = (event => {
    setemail(event.target.value);
    const userEmail = event.target.value;
    emailValidateHandler(userEmail);
  })


  const newpasswordChangeHandler = (event => {
    setnewPassword(event.target.value);
    passwordValidateHandler(event.target.value);
  })

  const oldpasswordChangeHandler = (event => {
    setoldPassword(event.target.value);
  })

  const checkpasswordChangeHandler = (event => {
    setcheckPassword(event.target.value);
    console.log("check pass");
    checkPasswordMatchHandler(event.target.value);
  })


  //Validating email value in form
  const emailValidateHandler = (userEmail) => {
    const err = emailValidaterHelper(userEmail);
    setemailErr(err)
  }

  //Validating Password
  const passwordValidateHandler = (userPassword) => {
    const err = passwordValidaterHelper(userPassword);

    setnewPasswordErr(err);
  }

  //Validating new password with check password
  const checkPasswordMatchHandler = (password) => {

    let messages = [];
    let isValid = true;

    console.log("match");
    const len = password?.trim().length;

    console.log(newPassword.substring(0, len) + " " + password?.trim());
    if (len === 0) {
      isValid = false;
    }
    else if (!newPassword.substring(0, len + 1).match(password?.trim())) {
      console.log("no match");
      isValid = false;
      messages.push("Passwords do not match");
    }
    setcheckPasswordErr({ isValid, messages });


  }



  //whenever an error is introduced or removed the form submit error is then changed accordingly to facilitate submit
  useEffect(() => {
    if (emailErr.isValid && newPasswordErr.isValid && checkPasswordErr.isValid)
      setisSubmitValid(true);
    else
      setisSubmitValid(false);

  }, [emailErr, newPasswordErr, checkPasswordErr]);



  const submitFormHandler = (event => {
    event.preventDefault();

    //all the date is checked before submission
    passwordValidateHandler(newPassword);
    emailValidateHandler(email);

    if (newPassword != checkPassword) {
      setcheckPasswordErr({ isValid: false, messages: ['Passwords do not match'] })
      return;
    }

    if (isSubmitValid === true) {
      //if the form is valid then the data is sent to the backend
      let user = loginContext.loggedInUser;

      const passwordObject = {
        email: email,
        oldPassword: oldPassword,
        newPassword: checkPassword
      }

      changePassword(passwordObject, user?.userId).then(res => {
        toast.success(res.message);
        onResetHandler(event);
        //if the password is changed then the user is logged out
        loginContext.logout();
      }).catch(err => {
        toast.error(err.response.data.message);
      })

    }



  })


  const onResetHandler = (event) => {
    event.preventDefault();

    setemail('');
    setcheckPassword('');
    setnewPassword('');
    setoldPassword('');
    setcheckPasswordErr({ isValid: null })
    setemailErr({ isValid: null })
    setnewPasswordErr({ isValid: null })
  }




  return (
    <Container style={{ marginTop: '10vh' }}>
      <Row>
        <Col
          md={{
            offset: 3,
            size: 6
          }}
          sm="12">
          <Card outline color='dark'>
            <CardHeader className='text-center header' >
              <h2>Change Password</h2>
            </CardHeader>
            <div className='mand'>* All fields are mandatory, User have to login afer changing password</div>
            <CardBody className='body'>

              <Form onSubmit={submitFormHandler} onReset={onResetHandler}>
                <FormGroup>
                  <Label for='useremail' className='white'>Email : </Label>
                  <Input id='useremail' placeholder='Enter your email' type='email' value={email} onChange={emailChangeHandler} valid={emailErr.isValid === true}
                    invalid={emailErr.isValid === false} />
                  {emailErr.isValid === false && <FormValidationError messages={emailErr.messages} />}
                </FormGroup>

                <FormGroup>
                  <Label for='oldpass' className='white'>Old Password : </Label>
                  <Input id='oldpass' placeholder='Enter your old password' type='password' value={oldPassword} onChange={oldpasswordChangeHandler} />
                </FormGroup>

                <FormGroup>
                  <Label for='newpass' className='white'>New Password : </Label>
                  <Input id='newpass' placeholder='Enter your new password' type='password' value={newPassword} onChange={newpasswordChangeHandler} valid={newPasswordErr.isValid === true} invalid={newPasswordErr.isValid === false} />
                  {newPasswordErr.isValid === false && <FormValidationError messages={newPasswordErr.messages} />}
                </FormGroup>

                <FormGroup>
                  <Label for='checkpass' className='white'>Re-enter Password : </Label>
                  <Input id='checkpass' placeholder='Re-enter new password' type='password' value={checkPassword} onChange={checkpasswordChangeHandler} valid={checkPasswordErr.isValid === true} invalid={checkPasswordErr.isValid === false} />
                  {checkPasswordErr.isValid === false && <FormValidationError messages={checkPasswordErr.messages} />}
                </FormGroup>

                <Container className='text-center' fluid>
                  <Button color='primary' type='submit'>Change Password</Button>
                  <Button color='warning' type='reset' className='mx-2'>Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container >
  )
}
