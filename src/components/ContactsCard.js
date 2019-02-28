import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class ContactsCard extends Component {
  render() {
    const { isLogged } = this.props;
    if (isLogged) {
      return (
        <Link to={`/contacts/${this.props.id}`}>
          <h1>{this.props.name}</h1>
          <h2>{this.props.jobtitle}</h2>
        </Link>
      )

    } else {
      return <div>
      </div>
    }

  }
}

export default withAuth()(ContactsCard);