import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import MovieCard from '../../Components/Movies/MovieCard';
import '../../Static/Styles/MovieStyles/MoviesFeed.css'
import { Icon, Search, Input } from 'semantic-ui-react';
import { getAllMovies, searchMovies } from '../../Services/MovieServices';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { Vortex } from 'react-loader-spinner'
export default function MoviesFeed() {

  const navigate = useNavigate();

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  // let movies = [];
  // useEffect(() => {
  //   if (searchInput.length === 0) {
  //     getAllMovies().then(res => {
  //       console.log(res);
  //       setMovies(res);
  //       setIsLoaded(true);
  //     }).catch(err => {
  //       console.log(err);
  //     });
  //   }
  //   else {
  //     searchMovies(searchInput).then(res => {
  //       console.log(res);
  //       setMovies(res);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }, [searchInput])


  useEffect(() => {
    let timeout;
    if (searchInput.length === 0) {
      getAllMovies().then(res => {
        console.log(res);
        setMovies(res);
        setIsLoaded(true);
      }).catch(err => {
        console.log(err);
      });
    }
    else {
      timeout = setTimeout(() => {
        searchMovies(searchInput).then(res => {
          console.log(res);
          setMovies(res);
          setIsLoaded(true);
        }).catch(err => {
          console.log(err);
        })
      }, 500);
    }
    return () => {
      clearTimeout(timeout)
    };
  }, [searchInput]);

  // setTimeout(() => {
  //   console.log(movies);
  // }, 1000);


  const onPosterClickHandler = (movieId) => {
    navigate("/movies/details/" + movieId);
  }

  const spinner = (
    <Vortex
      visible={true}
      height="200"
      width="200"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['white', 'white', 'white', 'white', 'white', 'white']}
    />
  )


  const searchMoviesHandler = (event => {
    setSearchInput(event.target.value)
  })


  if (isLoaded === true) {
    return (
      <React.Fragment>
        <Container fluid className='movie-container'>
          <h1 className='feed-title'>
            {searchInput.length === 0 ? "ALL MOVIES" : `Search Results for : ${searchInput}`}
          </h1>
          <div className='feed-search'>
            <Input icon='search' className='feed-search-input' placeholder='Search movies by name and director' value={searchInput} onChange={searchMoviesHandler} />
          </div>
          <Row className='feed-grid'>
            {
              movies.map(movie => {
                return (
                  <Col
                    xs={{
                      size: 6,
                      offset: 0
                    }}
                    md={{
                      size: '3',
                    }}
                    lg={{
                      size: '2'
                    }}
                    sm={
                      {
                        size: '4',
                        offset: '0'
                      }
                    }

                    className='my-2'>
                    <MovieCard movie={movie} onClick={onPosterClickHandler} />
                  </Col>
                )
              })

            }
          </Row>


        </Container>
        <Footer />
      </React.Fragment >
    )
  }
  else {
    return (
      <div className='spinner-container'>
        {spinner}
      </div>

    )
  }
}
