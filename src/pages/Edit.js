import React, { Component } from 'react';
import editprofile from '../lib/edit-service';
import { withAuth } from '../components/AuthProvider';
import { Redirect } from 'react-router';
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
  state = {
    name: this.props.user.name,
    surname: this.props.user.surname,
    email: this.props.user.email,
    jobtitle: this.props.user.jobtitle,
    phone: this.props.user.phone,
    company: this.props.user.company,
    address: this.props.user.address,
    linkedin: this.props.user.linkedin,
    redirect: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, surname, email, jobtitle, phone, company, address, linkedin } = this.state
    //ESTA ES LA PARTE QUE SE COMUNICA CON EDIT SERVICE Y LUEGO AL BACK!!:
    editprofile.edit({ name, surname, email, jobtitle, phone, company, address, linkedin })
      .then((user) => {
        return this.props.setUser(user)
      })
      .then(() => {
        return this.setState({
          redirect: true
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, surname, email, jobtitle, phone, company, address, linkedin, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile/me" />
    }
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Surname:</Form.Label>
          <Form.Control type="text" name="surname" value={surname} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" name="email" value={email} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Title:</Form.Label>
          <Form.Control type="text" name="jobtitle" value={jobtitle} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone number:</Form.Label>
          <Form.Control type="text" name="phone" value={phone} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company name:</Form.Label>
          <Form.Control type="text" name="company" value={company} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" value={address} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>LinkedIn:</Form.Label>
          <Form.Control type="text" name="linkedin" value={linkedin} onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" value="Submit" >Submit</Button>
      </Form >
    )
  }
}

export default withAuth()(Login);