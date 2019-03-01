import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import contacts from '../lib/contact-service';
// import { Redirect } from 'react-router';
import ContactsCard from '../components/ContactsCard';

class Contactlist extends Component {

  state = {
    contactsArray: this.props.user.contacts,
  }

  componentDidMount = () => {
    const userObject = this.props.user.contacts;
    contacts.showContactsList(userObject)
      // .then((user) => {
      //   return this.props.setUser(user)
      // })
      .then((data) => {
        return this.setState({
          contactsArray: data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    // if (this.state.loaded) {
    //   return (
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