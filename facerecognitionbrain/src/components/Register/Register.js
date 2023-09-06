import React from 'react';

const {BACKEND_URL} = process.env

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }
  // With the input in the name box changes
  // the state of the variable name
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  // With the input in the email box changes
  // the state of the variable email
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  // With the input in the password box changes
  // the state of the variable password
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    fetch(`${BACKEND_URL}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      //convierto la raw data que mando en un objeto
      //con sintaxis de JSON, sabiendo que el server
      //está programado para recibir JSOn justamente.
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(`falló: ${err}`);
      })
      // el server está programado para contestar
      // con el último usuario agregado a la database
      .then((lastUser) => {
        // acá tengo una diferencia con el video. Mi solución me gusta más.
        if (lastUser.id) {
          console.log(lastUser);
          this.props.loadUser(lastUser);
          this.props.onRouteChange('signIn');
        }
      })
      .catch((err) => {
        console.log('last user failed');
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
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
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
            <div className="lh-copy mt3 pointer">
              {/* onRouteChange está destructurado más arriba
               * sino habría que poner this.props.onRouteChange
               */}
              <p
                onClick={() => onRouteChange('signIn')}
                href="#0"
                className="f6 link dim black db"
              >
                {' '}
                Already user? Sign in{' '}
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
