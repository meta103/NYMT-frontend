import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return <div>
        <Link to='/home'>Home</Link>
        <Link to='/profile/me'>My profile</Link>
        <p onClick={logout}>Logout</p>
      </div>
    } else {
      return <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }

  }
}

export default withAuth()(Navbar);