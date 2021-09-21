import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// import Map from './Map';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';  




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      imgSrc: ''
    }
  }
  getLocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      const response = await axios.get(url);
      console.log(response);

      const location = response.data[0];
      this.setState({
        location: location,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${location.lat},${location.lon}&zoom=13`,
        error: false,
        longitude: location.lon,
        latitude: location.lat
      });
    } catch (error) {
      console.error('Unable to find city', this.state.searchQuery);
      this.setState({ error: true });
    }
  }
  render() {
    return (
      <>
<div>
        <h2>Look up any City!</h2>
            <Container>
              <Form onSubmit={this.getLocation} >
                <Form.Group>
                  <Form.Control type="text" placeholder="search for a city here" onChange={(event) => this.setState({ searchQuery: event.target.value })}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Explore!
                </Button>
              </Form>
            </Container>
            {/* {this.state.location.place_id &&
              <Map
                displayName={this.state.location.display_name}
                longitude={this.state.longitude}
                latitude={this.state.latitude}
                imgSrc={this.state.imgSrc}
              />
            }
            {
            this.state.error && <h2> Please enter valid entry.</h2>
            }  */}

      </div>
      </>
    );
  }
}

export default App;