import axios from 'axios';

class Contact {
  constructor() {
    this.contact = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  findContact(contactId) {
    return this.contact.get(`/contacts/find/${contactId}`)
      .then(({ data }) => {
        return data
      })
  }

  addContact(contactUserIdAndContacts) {
    return this.contact.put('/contacts/add', { contactUserIdAndContacts })
      .then((data) => data);
  }

  showContactsList(userObject) {
    return this.contact.get('/contacts/list', userObject)
      .then((data) => data.data.contacts)
  }

  // login(user) {
  //   const { email, password } = user;
  //   return this.auth.post('/auth/login', { email, password })
  //     .then(({ data }) => data);
  // }

  // logout() {
  //   return this.auth.post('/auth/logout', {})
  //     .then(response => response.data)
  // }

  // me(user) {
  //   return this.auth.get('/auth/me')
  //     .then(response => response.data)
  // }
}

const contacts = new Contact();

export default contacts;