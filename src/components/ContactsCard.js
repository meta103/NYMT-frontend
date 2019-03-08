import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import '../app.css'

class ContactsCard extends Component {
  render() {
    const { isLogged } = this.props;
    if (isLogged) {
      return (
        <div className="contact-card-container">
          <Link to={`/contacts/${this.props.id}`} className="contact-card-container">
            <p className="ccctitle">{this.props.name}</p>
            <p className="cccjobtitle">{this.props.jobtitle}</p>
          </Link>
        </div>
      )
    } else {
      return <div>
      </div>
    }

  }
}

export default withAuth()(ContactsCard);