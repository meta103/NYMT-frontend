import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import moment from 'moment';

class TasksCard extends Component {
  state = {
    action: this.props.action
  }

  render() {
    if (this.state.action === "email") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>
            <h1 className="ccctitle">Send an {this.props.action} to</h1>
            <h2 className="cccjobtitle">{this.props.to}</h2>
            <p>{moment(this.props.date).fromNow()}</p>
          </Link >
        </div>
      )
    } else if (this.state.action === "call") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>

            <h1 className="ccctitle">Give a {this.props.action} to</h1>
            <h2 className="cccjobtitle">{this.props.to}</h2>
            <p>{moment(this.props.date).fromNow()}</p>
          </Link >
        </div>
      )
    } else if (this.state.action === "meeting") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>

            <h1 className="ccctitle">Have a {this.props.action} with</h1>
            <h2 className="cccjobtitle">{this.props.to}</h2>
            <p>{moment(this.props.date).fromNow()}</p>
          </Link >
        </div>
      )
    }

  }


}

export default withAuth()(TasksCard);