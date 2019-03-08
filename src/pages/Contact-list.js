import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import contacts from '../lib/contact-service';
import ContactsCard from '../components/ContactsCard';

class Contactlist extends Component {

  state = {
    contactsArray: [],
  }

  componentDidMount = () => {
    const userObject = this.props.user.contacts;
    contacts.showContactsList(userObject)
      .then((data) => {
        return this.setState({
          contactsArray: data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>My contacts</h1>
        {this.state.contactsArray.map((contact) => {
          return <ContactsCard name={contact.name} jobtitle={contact.jobtitle} id={contact._id} />
        })}
      </div>

    )
  }
}


export default withAuth()(Contactlist);