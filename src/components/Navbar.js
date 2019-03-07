import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import { Navbar, Nav } from 'react-bootstrap';
import '../app.css';

class NavBar extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return <div>
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Link to='/home'><Navbar.Brand>NTMY</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link ><Link to='/home' className="reset-link-decoration">Home</Link></Nav.Link>
              <Nav.Link> <Link to='/profile/me' className="reset-link-decoration">My profile</Link></Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    } else {
      return <div>

      </div>
    }

  }
}

export default withAuth()(NavBar);