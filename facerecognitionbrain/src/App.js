import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation(data) {
    //get the info of the boxes vertices
    const boxes = data.outputs[0].data.regions.map(
      (e) => e.region_info.bounding_box,
    );
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return boxes.map((box) => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height,
      };
    });
  }

  displayFaceBox = (box) => {
    this.setState({ boxes: box })
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch('https://mybackendfrecon.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((api_response) => api_response.json())
      .then((data) => {
        this.displayFaceBox(this.calculateFaceLocation(data));
        if (data) {
          fetch('https://mybackendfrecon.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((count) => count.json())
            .then((data) => {
              this.setState(
                Object.assign(this.state.user, { entries: data.entries }),
              );
            })
            .catch((err) => console.log('Ultimo de image', err));
        }
      });
  };

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="square" bg={true} />

        <Navigation
          // isSignedIn={isSignedIn}
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo className='logo' tiltEnable="false" />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === 'signIn' ? (
          <div>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
