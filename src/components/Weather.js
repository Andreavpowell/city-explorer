 import React from 'react';
import Container from 'react-bootstrap/Container';

class Weather extends React.Component {
  render() {
    return(
      <Container>
          <h3>Weather Forecast for {this.props.forecast.city_name}:</h3>
          <Weather date={this.props.forecast.datetime} description={this.props.forecast.weather.description} />
      </Container>
    )
  }
}

export default Weather;