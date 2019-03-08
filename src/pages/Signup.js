import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { Button, Form } from 'react-bootstrap';

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
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="white-background">
        <img src="images/NTMYlogo.png" alt="" className="img-resize" />
        <h1>NTMY</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={name} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={this.handleChange} />
          </Form.Group>
          <Button type="submit" value="Signup" className="addtask-done-button"> Sign up </Button>
        </Form>
        <p className="login-signup-text">Already have account?
          <Link className="reset-link-decoration-auth" to={"/login"}> Login</Link>
        </p>
      </div>
    )
  }
}

export default Signup;