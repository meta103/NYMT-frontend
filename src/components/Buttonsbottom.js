import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import { Navbar, Nav, Image } from 'react-bootstrap';

class Buttonsbottom extends Component {
  render() {
    const { isLogged } = this.props;
    if (isLogged) {
      return (
        <Navbar bg="light" fixed="bottom" className="p-0">
          <Nav className="mr-auto p0">
            <Link to='/contacts'><Image src="/images/1.png" /></Link>


            <Link to='/scan' className="mr-1 ml-2"><Image src="/images/2.png" /></Link>


            <Link to='/tasks'><Image src="/images/3.png" /></Link>
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