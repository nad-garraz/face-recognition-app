import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navivation/Navigation';
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
  // box: {},
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
    // console.log(data);
    const boxes = data.outputs[0].data.regions.map(
      (e) => e.region_info.bounding_box,
    );
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // const boxes = box[0];
    // return {
    //   leftCol: boxes.left_col * width,
    //   topRow: boxes.top_row * height,
    //   rightCol: width - boxes.right_col * width,
    //   bottomRow: height - boxes.bottom_row * height,
    // };
    return boxes.map((box) => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height,
      };
    });
    // console.log('Detected boxes array: ', detectedBoxes);
    // return detectedBoxes;
  }

  displayFaceBox = (box) => {
    console.log("changing state: ", box);
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
        // console.log(data);
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
return(<h1>Update 2023-12-02: 90 days of free database on render expired, so the app will be up as soon as possible</h1>)
    // return (
    //   <div className="App">
    //     <ParticlesBg className="particles" type="square" bg={true} />
    //
    //     <Navigation
    //       isSignedIn={isSignedIn}
    //       onRouteChange={this.onRouteChange}
    //     />
    //     {route === 'home' ? (
    //       <div>
    //         <Logo tiltEnable="false" />
    //         <Rank name={user.name} entries={user.entries} />
    //         <ImageLinkForm
    //           onInputChange={this.onInputChange}
    //           onButtonSubmit={this.onButtonSubmit}
    //         />
    //         <FaceRecognition box={boxes} imageUrl={imageUrl} />
    //       </div>
    //     ) : route === 'signIn' ? (
    //       <div>
    //         <Signin
    //           loadUser={this.loadUser}
    //           onRouteChange={this.onRouteChange}
    //         />
    //       </div>
    //     ) : (
    //       <div>
    //         <Register
    //           loadUser={this.loadUser}
    //           onRouteChange={this.onRouteChange}
    //         />
    //       </div>
    //     )}
    //   </div>
    // );
  }
}

const now = new Date();
const currentTime = now.toLocaleTimeString();
console.log(currentTime);

export default App;
