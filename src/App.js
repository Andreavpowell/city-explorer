import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';

import Weather from './components/Weather.js';
import Movies from './components/Movies.js';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: '',
      latitude: '',
      longitude: '',
      forecast: null,
      yelps: null,
      movieArray: null,
    }
  }

  getLocation = async () => {
    const locationURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      const response = await axios.get(locationURL);
      const location = response.data[0].display_name;
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;

      this.setState({
        location,
        latitude,
        longitude,
        error: false,
      });

      this.getThreeDayForecast(latitude, longitude);
      this.getYelp(latitude, longitude);

      } catch (error) {

      console.error('Unable to find city', 
      this.state.searchQuery);

      this.setState({ error: true });
    }
  };

  getThreeDayForecast = async (latitude, longitude) => {
    try {
      const forecastURL = process.env.WEATHERBIT_API_KEY;
      const forecast = await axios.get(`${forecastURL}/forecast`, {params: {searchQuery: this.state.searchQuery, latitude: latitude, longitude: longitude}});

      this.setState({
        forecast: forecast.data.data[0],
      });

      this.getMovies();

    } catch(error) {
      console.log(error, '<---- GET ERROR LOG ---<<<');
    }
  }

  getYelp = async (latitude, longitude) => {
    
    try {
      const yelpURL = process.env.YELP_API_KEY;
      const yelps = await axios.get(`${yelpURL}/yelp`, {params: {searchQuery: this.state.searchQuery, latitude: latitude, longitude: longitude}});

      this.setState({
        yelps,
      });

    } catch(error) {
      console.log(error, '<---- GET ERROR LOG ---<<<');
    }
  }

  getMovies = async () => {
    try {
      const moviesURL = process.env.MOVIE_API_KEY;

      const movies = await axios.get(`${moviesURL}/movies`, {params: {searchQuery: this.state.forecast.city_name,}});

      this.setState({
        movieArray: movies.data,
      });

    } catch(error) {
      console.log(error, '<---- GET ERROR LOG ---<<<');
    }
  }

  changeHandler = (event) => {
   this.setState({searchQuery: event.target.value});
  }

  render() {
    return (
      <>
      
        <h2>Search for a City and See What You Can Find!</h2>
        <input onChange={this.changeHandler} placeholder="search"></input>
        <Button onClick={this.getLocation}>Explore!</Button>

        {this.state.movieArray &&
          <>
          <ul>
          <li>City Name: {this.state.location.display_name}</li>
          <li>Latitude: {this.state.latitude}</li>
          <li>Longitude: {this.state.longitude}</li>
          </ul>
          <h3>Map:</h3>
          <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.429fe5d05e82b46d41d445914dfbab1b&center=${this.state.latitude},${this.state.longitude}&zoom=12`} alt={this.state.location.display_name} rounded fluid />
          <Weather forecast={this.state.forecast} name={this.state.searchQuery} />
          <Movies movies={this.state.movieArray} />
          </>
        }

        {
          this.state.error &&
          <Container>
          <h2>Looks like we can't find that!</h2>
          <Image src={`https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wisdomenough.com%2Fwp-content%2Fuploads%2F2016%2F04%2Fa-map-lost.jpg&f=1&nofb=1`} alt="" rounded fluid/>
          </Container> 
        }
      </>
    )
  }
}


export default App;