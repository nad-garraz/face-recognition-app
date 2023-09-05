import React from 'react';

//Signin is a component that extendes the class React.Component
class Signin extends React.Component {
  // constructor generates the class. It recives props that come 
  // from the place where Signin is called.
  constructor(props) {
    super(props);
    //iniciates the state of the component
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  // method that listens to event changes
  // and changes the state of the signInEmail property
  onEmailChange = (event) => {
    // update the state of the signInEmail property
    // with the input of event
    this.setState({ signInEmail: event.target.value });
  };

  // method that listens to event changes
  // and changes the state of the signInPassword property
  onPasswordChange = (event) => {
    // update the state of the signInPassword property
    // with the input of event
    this.setState({ signInPassword: event.target.value });
  };

// Send the sing in information
  onSubmitSignIn = () => {
    //send a POST request with the email and password
    //entered by the user
    fetch(process.env.BACKEND_URL + '/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      //the JSON.stringify method turn the object
      //{ key1: value1,
      //  key2: value2}
      //  into a json object
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      }),
    })
      //the POST request answers with a response with 
      //a "success" or "failure" of the request.
      .then((response) => response.json())
      .then((user) => {
        // if condition is met go to HOME
        if (user.id) {
          // console.log("Acá está el ID:", user.id)
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else {
          console.log('not an user')
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3 pointer">
              <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db" > New? Register </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
