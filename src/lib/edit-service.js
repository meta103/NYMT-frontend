import axios from 'axios';

class Editprofile {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  edit(user) {
    const { name, surname, email, jobtitle, phone, company, address, linkedin } = user;
    return this.auth.put('/edit/profile', { name, surname, email, jobtitle, phone, company, address, linkedin })
      .then(({ data }) => data);
  }
}

const editprofile = new Editprofile();

export default editprofile