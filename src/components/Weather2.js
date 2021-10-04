import React from 'react';
import Container from 'react-bootstrap/Container';

class Weather2 extends React.Component {
  render() {
    return (
      <Container>
      <ul>
        <li id="forecast_date">{this.props.date} </li>
        <li id="forecast_description">{this.props.description}</li>
      </ul>
      </Container>
    )
  }
}

export default Weather2;