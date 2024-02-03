import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { addMovieImage } from '../../Services/MovieServices';
import { imageValidaterHelper } from '../../Utils/ValidationHelpers';
import FormValidationError from '../FormValidationError';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function MovieForm({
  name = "",
  dir = "",
  video = "",
  syn = "",
  update = false,
  submitMovie
}) {


  const navigate = useNavigate();


  const [movieName, setmovieName] = useState(name);
  const [movieDirector, setMovieDirector] = useState(dir);
  const [moviePoster, setmoviePoster] = useState(null);
  const [synopsis, setSynopsis] = useState(syn);
  const [movieTrailer, setMovieTrailer] = useState(video);



  const [nameErr, setnameErr] = useState({ isValid: null });
  const [directorErr, setdirectorErr] = useState({ isValid: null });
  const [posterErr, setposterErr] = useState({ isValid: null });
  const [synopsisErr, setsynopsisErr] = useState({ isValid: null });






  const imageValidationHelper = () => {
    if (moviePoster === null) {
      setposterErr({ isValid: true });
      return;
    }
    const err = imageValidaterHelper(moviePoster);
    setposterErr(err);
  }


  useEffect(() => {
    imageValidationHelper();
  }, [moviePoster]);


  const changeNameHandler = (event) => {
    setnameErr({ isValid: null });
    setmovieName(event.target.value);
  }

  const changeDirectorHandler = (event) => {
    setdirectorErr({ isValid: null });
    setMovieDirector(event.target.value);
  }



  const synopsisChangeHandler = (e) => {
    setsynopsisErr({ isValid: null });
    setSynopsis(e.target.value);
  }

  const posterChangeHandler = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setmoviePoster(e.target.files[0]);
  }

  const trailerUrlChangeHandler = (event) => {
    setMovieTrailer(event.target.value);
  }



  const submitFormHandler = (e) => {
    e.preventDefault();

    if (movieName === "") {
      setnameErr({
        isValid: false,
        messages: ["Name must not be empty"]
      })
      return;
    }

    if (movieDirector === "") {
      setdirectorErr({
        isValid: false,
        messages: ["Director name must not be empty"]
      })
      return;
    }


    const movie = {
      movieName: movieName,
      director: movieDirector,
      synopsis: synopsis,
      videoUrl: movieTrailer
    }


    submitMovie(movie).then(res => {


      console.log(res);

      if (!update)
        toast.success("Movie added successfully");
      else
        toast.success("Movie updated successfully");

      if (moviePoster !== null) {
        addMovieImage(moviePoster, res?.movieId).then(response => {
          toast.success("Image added successfully");
        }).catch(err => {
          toast.error(err);
        })
      }


      resetFormHandler(e);
      navigate("/");

    }).catch(err => {
      if (err?.response?.status === 400)
        serverErrorHandler(err?.response?.data);


      console.log(err);
    })
  }


  const resetFormHandler = (e) => {
    e.preventDefault();

    setmovieName("");
    setMovieDirector("");
    setSynopsis("");
    setMovieTrailer("");
    setdirectorErr({ isValid: null });
    setnameErr({ isValid: null });
    setsynopsisErr({ isValid: null });
    setmoviePoster(null);
    setposterErr({ isValid: null });

  }


  const serverErrorHandler = (data => {
    if (data?.movieName) {
      setnameErr({ isValid: false, messages: [data.movieName] })
    }

    if (data?.director) {
      setdirectorErr({ isValid: false, messages: [data?.director] })
    }

    if (data?.synopsis) {
      setsynopsisErr({ isValid: false, messages: [data?.synopsis] })
    }
  })




  return (
    <Container className='mt-3'>
      <Row>
        <Col
          md={{
            offset: 2,
            size: 8
          }}
          sm="12"
        >

          <Card>
            <CardHeader className='text-center'>
              <h2>{update ? "Update Movie" : "Add New Movie"}</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitFormHandler} onReset={resetFormHandler}>
                {/* Movie name input */}
                <FormGroup>
                  <Label for='movieName'>Movie Name:</Label>
                  <Input id='movieName' name='movieName' type='text' placeholder='Enter Movie Name here' value={movieName} onChange={changeNameHandler}
                    valid={nameErr.isValid === true} invalid={nameErr.isValid === false} />
                  {nameErr.isValid === false && <FormValidationError messages={nameErr.messages} />}
                </FormGroup>

                {/* movie director input */}
                <FormGroup>
                  <Label for='directorName'>Director Name:</Label>
                  <Input id='directorName' name='directorName' type='text' placeholder='Enter Director Name here' value={movieDirector} onChange={changeDirectorHandler} valid={directorErr.isValid === true} invalid={directorErr.isValid === false} />
                  {directorErr.isValid === false && <FormValidationError messages={directorErr.messages} />}
                </FormGroup>



                {/* movie image input */}
                <FormGroup>
                  <Label for='poster'>Movie Image:</Label>
                  <Input id='poster' name='poster' type='file' placeholder='Enter Movie image here' onChange={posterChangeHandler}
                    valid={posterErr.isValid === true} invalid={posterErr.isValid === false} />
                  {posterErr.isValid === false && <FormValidationError messages={posterErr.messages} />}
                </FormGroup>


                <FormGroup>
                  <Label for='trailer'>Movie Trailer Url:</Label>
                  <Input id='trailer' name='trailer' type='text' placeholder='Enter Movie Trailer Url here' onChange={trailerUrlChangeHandler} value={movieTrailer} />
                </FormGroup>

                {/* movie synopsis */}
                <FormGroup>
                  <Label for='synopsis'>Movie Synopsis:</Label>
                  <Input id='synopsis' name='synopsis' type='textarea' style={{ height: '15em' }} placeholder='Enter Movie synopsis here' value={synopsis} onChange={synopsisChangeHandler} valid={synopsisErr.isValid === true} invalid={synopsisErr.isValid === false} />
                  {synopsisErr.isValid === false && <FormValidationError messages={synopsisErr.messages} />}
                </FormGroup>
                <div className='text-center'>
                  <Button type='submit' className='mx-2' color='success' size='large'>{update ? "Update Movie" : "Add Movie"}</Button>
                  <Button type='reset' color='warning'>Reset Form</Button>
                </div>
              </Form>


            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container >
  )
}
