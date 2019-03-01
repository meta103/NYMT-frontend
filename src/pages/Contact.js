import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import contacts from '../lib/contact-service';
import { Redirect } from 'react-router';

class Contact extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    jobtitle: '',
    phone: '',
    company: '',
    address: '',
    linkedin: '',
    redirect: false,
    idUser: this.props.match.params.id,
  }

  handleAddContact = () => {
    const contactId = this.props.match.params.id;
    const userId = this.props.user._id;
    const contactsArray = this.props.user.contacts;


    contacts.addContact({ contactId, userId, contactsArray })
      // .then((user) => {
      //   console.log(user)
      //   return this.props.setUser(user)
      // })
      .then(() => {
        return this.setState({
          redirect: true
        })
      })
      .catch(error => console.log(error))
  }

  componentDidMount = () => {
    //event.preventDefault();
    const contactId = this.props.match.params.id;
    contacts.findContact(contactId)
      // .then((user) => {
      //   console.log(user)
      //   return this.props.setUser(user)
      // })
      .then((user) => {
        this.setState({
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
      .catch(error => console.log(error))
  }



  render() {
    const { name, surname, email, jobtitle, phone, company, address, linkedin, redirect } = this.state;
    if (redirect) {
      return <Redirect to={{
        pathname: "/tasks/new",
        state: { referrer: this.state.idUser, referrer2: this.state.name }
      }} />
    }
    return (
      <div>
        <h1>Business Card</h1>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Email: {email} </p>
        <p>Job title: {jobtitle}</p>
        <p>Phone number: {phone}</p>
        <p>Company: {company}</p>
        <p>Address: {address}</p>
        <p>LinkedIn: {linkedin}</p>
        <div onClick={this.handleAddContact}>Assign a task</div>
      </div>
    )

  }
}

export default withAuth()(Contact);