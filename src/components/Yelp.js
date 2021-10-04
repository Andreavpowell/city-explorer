import React from 'react';
import Container from 'react-bootstrap/Container';

class Yelp extends React.Component {
  render() {
    const yelp = this.props;
    console.log(yelp, "???")
    return (
      <Container>
        <h1>Yelp</h1>
      </Container>
    )
  }
}

export default Yelp;