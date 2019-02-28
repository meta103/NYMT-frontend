import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Contact from './pages/Contact';
import Contactlist from './pages/Contact-list'
import Buttonsbottom from './components/Buttonsbottom';
import './app.css';
import NewTask from './pages/Task-new';



class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/home" component={Private} />
            <PrivateRoute exact path="/profile/me" component={Profile} />
            <PrivateRoute exact path="/profile/me/edit" component={Edit} />
            <PrivateRoute exact path="/contacts" component={Contactlist} />
            <PrivateRoute path="/contacts/:id" component={Contact} />
            <PrivateRoute path="/tasks/new" component={NewTask} />
          </Switch>

          <Buttonsbottom />

        </div>
      </AuthProvider>
    )
  }
}

export default App;
