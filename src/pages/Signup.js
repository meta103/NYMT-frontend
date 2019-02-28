import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';

class Signup extends Component {

  state = {
    name: "",
    email: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;

    auth.signup({ name, email, password })
      .then((user) => {
        this.setState({
          name: "",
          email: "",
          password: "",
        });
        this.props.setUser(user)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default Signup;