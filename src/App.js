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
import Taskslist from './pages/Tasks-list';
import Task from './pages/Task';
import Test from './pages/QR-scanner';




class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div >
          <Navbar />
          <div className="container">
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/home" component={Private} />
              <PrivateRoute exact path="/profile/me" component={Profile} />
              <PrivateRoute exact path="/profile/me/edit" component={Edit} />
              <PrivateRoute exact path="/contacts" component={Contactlist} />
              <PrivateRoute path="/contacts/:id" component={Contact} />
              <PrivateRoute exact path="/tasks" component={Taskslist} />
              <PrivateRoute exact path="/tasks/new" component={NewTask} />
              <PrivateRoute path="/tasks/:id" component={Task} />
              <PrivateRoute exact path="/scan" component={Test} />
            </Switch>
          </div>

          <Buttonsbottom />

        </div>
      </AuthProvider>
    )
  }
}

export default App;
