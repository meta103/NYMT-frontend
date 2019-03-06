import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import '../app.css';
import { Image, Button } from 'react-bootstrap';

class Profile extends Component {
  render() {
    const { isLogged, user } = this.props;
    const { name, surname, email, jobtitle, phone, company, address, linkedin, } = user;
    if (isLogged) {
      return <div>
        <h1>My Business Card</h1>
        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
          <div class="flipper">
            <div class="front">

              <p className="BCname">{name} <br /> {surname}</p>
              <p className="BCjobtitle">{jobtitle}</p>
              <p className="BCcompany">at {company}</p>
              <img className="BCicons" src="/images/BCicons.png" alt="" />
              <p className="BCdetailstipo BCcommonposition BCphone"> {phone}</p>
              <p className="BCdetailstipo BCcommonposition BCemail">{email} </p>
              <p className="BCdetailstipo BCcommonposition BClinkedin">{linkedin}</p>
              <p className="BCdetailstipo BCcommonposition BCaddress">{address}</p>

            </div>
            <div class="back">
              <div className="QRContainer2">
                <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${this.props.user._id}&amp;size=250x250`} alt="" title="" thumbnail />
              </div>
              <p className="BCback-primary-text">SCAN ME</p>
              <p className="BCback-secondary-text">{name} {surname} will then be added to your contacts</p>


            </div>
          </div>

        </div>

        <Link to='/profile/me/edit' ><Button className="BCedit">Edit</Button></Link>

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