import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { Link } from 'react-router-dom';
//import { AuthConsumer } from '../components/AuthProvider';
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state

    auth.login({ email, password })
      .then((user) => {
        this.props.setUser(user)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="white-background">
        <img src="images/NTMYlogo.png" alt="" className="img-resize" />
        <h1>NTMY</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={this.handleChange} />
          </Form.Group>
          <Button type="submit" value="Login" className="addtask-done-button"> Login </Button>
        </Form>

        <p className="login-signup-text">Don't you have an account?
        <Link className="reset-link-decoration-auth" to={"/signup"}> Sign up</Link>
        </p>
      </div>
    )
  }
}

export default Login;