import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import { Navbar, Nav } from 'react-bootstrap';

class Buttonsbottom extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return (
        <Navbar bg="light" fixed="bottom">
          <Nav className="mr-auto">
            <Nav.Link ><Link to='/contacts'>My contacts </Link> </Nav.Link>


            <Nav.Link> <Link to='/home'>SCAN QR CODE</Link></Nav.Link>


            <Nav.Link> <Link to='/home'>My tasks</Link></Nav.Link>
          </Nav>
        </Navbar>

      )

    } else {
      return <div>
      </div>
    }

  }
}

export default withAuth()(Buttonsbottom);