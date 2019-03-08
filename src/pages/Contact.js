import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import contacts from '../lib/contact-service';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import '../app.css';

class Contact extends Component {
  state = {
    contactId: '',
    name: '',
    surname: '',
    email: '',
    jobtitle: '',
    phone: '',
    company: '',
    address: '',
    linkedin: '',
    redirect: false,
    isInContacts: false,
    idUser: this.props.match.params.id,
  }

  handleAsignATask = () => {
    return this.setState({
      redirect: true
    })
  }

  handleAddContact = () => {
    const contactId = this.props.match.params.id;
    const userId = this.props.user._id;
    const contactsArray = this.props.user.contacts;

    contacts.addContact({ contactId, userId, contactsArray })
      .then((user) => {
        return this.props.setUser(user.data)
      })
      .then(() => {
        this.setState({
          isInContacts: true,
        })
      })
      .catch(error => console.log(error))
  }

  componentDidMount = () => {
    const contactId = this.props.match.params.id;
    const userContacts = this.props.user.contacts;

    contacts.findContact(contactId)
      .then((user) => {
        this.setState({
          contactId: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          jobtitle: user.jobtitle,
          phone: user.phone,
          company: user.company,
          address: user.address,
          linkedin: user.linkedin,
        })
      })
      .then(() => {
        if (userContacts.includes(this.state.contactId)) {
          this.setState({
            isInContacts: true,
          })
        }
      })
      .catch(error => console.log(error))
  }

  showButtonContact = () => {
    const { isInContacts } = this.state;

    if (!isInContacts) {
      return (<Button variant="primary" size="sm" className="BCasignATaskAndAdd" onClick={this.handleAddContact}> Add contact </Button>)
    } else {
      return (<Button variant="primary" size="sm" className="BCasignATaskAndAdd" onClick={this.handleAsignATask}> Asign a task</Button>)
    }
  }

  render() {
    const { name, surname, email, jobtitle, phone, company, address, linkedin, redirect } = this.state;
    if (redirect) {
      return <Redirect to={{
        pathname: "/tasks/new",
        state: { referrer: this.state.idUser, referrer2: this.state.name }
      }} />
    } else {
      return (
        <div>
          <h1>{name}'s Business Card</h1>
          <div class="flip-container">
            <div class="front">
              <p className="BCname">{name} <br /> {surname}</p>
              <p className="BCjobtitle">{jobtitle}</p>
              <p className="BCcompany">at {company}</p>
              <img className="BCicons" src="/images/BCicons.png" alt="" />
              <p className="BCdetailstipo BCcommonposition BCphone"> {phone}</p>
              <p className="BCdetailstipo BCcommonposition BCemail">{email} </p>
              <p className="BCdetailstipo BCcommonposition BClinkedin">{linkedin}</p>
              <p className="BCdetailstipo BCcommonposition BCaddress">{address}</p>
              {this.showButtonContact()}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withAuth()(Contact);