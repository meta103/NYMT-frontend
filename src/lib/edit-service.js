import axios from 'axios';

class Editprofile {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    })
  }

  edit(user) {
    const { name, surname, email, jobtitle, phone, company, address, linkedin } = user;
    return this.auth.put('/edit/profile', { name, surname, email, jobtitle, phone, company, address, linkedin })
      .then(({ data }) => data);
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

const editprofile = new Editprofile();

export default editprofile