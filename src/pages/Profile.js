import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Profile extends Component {
  render() {
    const { isLogged, user } = this.props;
    const { name, surname, email, jobtitle, phone, company, address, linkedin, } = user;
    if (isLogged) {
      return <div>
        <h1>This is your Business Card!</h1>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Email: {email} </p>
        <p>Job title: {jobtitle}</p>
        <p>Phone number: {phone}</p>
        <p>Company: {company}</p>
        <p>Address: {address}</p>
        <p>LinkedIn: {linkedin}</p>
        <Link to='/profile/me/edit'>Edit</Link>

      </div>
    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }

  }
}

export default withAuth()(Profile);