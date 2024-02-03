import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { login } from '../Services/UserService';
import { toast } from 'react-toastify';
import { LoginContext } from '../Contexts/LoginContext';
import { Navigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Login() {


  const loginContext = useContext(LoginContext);

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const [validSubmission, setvalidSubmission] = useState(false);


  const userNameChangeHandler = (event) => {
    setuserName(event.target.value);
  }

  const passwordChangeHandler = (event => {
    setpassword(event.target.value);
  })



  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setvalidSubmission(userName.trim().length !== 0 && password.trim().length !== 0);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [userName, password]);


  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userName);
    const email = userName;
    login({ email, password }).then(res => {
      delete res.reviews;
      loginContext.login(res);
      // console.log(res);
      toast.success(res && "Login is successful");
    }).catch(e => {
      toast.error(e?.response?.data?.message);
    })
    loginResetHandler(e);
  }

  const loginResetHandler = (e) => {
    e.preventDefault();
    setuserName('')
    setpassword('')
    setvalidSubmission(false)
    // setisLoginValid(false)
  }

  // setTimeout(() => {
  //   console.log(loginContext.loggedInUser);
  // }, 100000);


  return (
    <React.Fragment>
      {loginContext.loggedInUser && <Navigate to="/" />}
      <Container style={{ marginTop: '10vh', minHeight: '60vh' }}>
        <Row>
          <Col
            md={{
              offset: 3,
              size: 6
            }}
            sm="12">
            <Card outline color='dark'>
              <CardHeader className='text-center'>
                <h2>Login here</h2>
              </CardHeader>
              <div style={{ color: 'red', padding: '10px', marginLeft: '20px' }}>* All fields are mandatory</div>
              <CardBody>

                <Form onSubmit={loginSubmitHandler} onReset={loginResetHandler}>
                  <FormGroup>
                    <Label for='useremail'>Email : </Label>
                    <Input id='useremail' placeholder='Enter your email' type='email' value={userName} onChange={userNameChangeHandler} />
                  </FormGroup>

                  <FormGroup>
                    <Label for='pass'>Password : </Label>
                    <Input id='pass' placeholder='Enter your password' type='password' value={password} onChange={passwordChangeHandler} />
                  </FormGroup>

                  <Container className='text-center' fluid>
                    <Button color='primary' type='submit' outline disabled={!validSubmission}>Login</Button>
                    <Button color='warning' type='reset' className='mx-2'>Reset</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  )
}
