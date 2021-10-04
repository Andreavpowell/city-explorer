import React from 'react';
import Movie from './Movie.js';
import Container from 'react-bootstrap/Container';

class Movies extends React.Component {
  render() {
    const movieArray = this.props.movies;
    return (
      <Container>
        <Movie movies={movieArray}/>
      </Container>
    )
  }
}

export default Movies;