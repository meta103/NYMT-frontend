import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import moment from 'moment';

class TasksCard extends Component {
  state = {
    action: this.props.action,
  }


  render() {
    if (this.state.action === "email") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>
            <div className="TCcontainer">
              <div>
                <img src="/images/email_24px.png" alt="" />
              </div>
              <div className="TCTextContainer">
                <p className="TCall TCaction">Send an {this.props.action} to</p>
                <p className="TCall TCperson">{this.props.to}</p>
                <p className="TCall TCdate">{moment(this.props.date).fromNow()}</p>
              </div>
            </div>
          </Link >
        </div>
      )
    } else if (this.state.action === "call") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>
            <div className="TCcontainer">
              <div>
                <img src="/images/call_24px.png" alt="" />
              </div>
              <div className="TCTextContainer">
                <p className="TCall TCaction">Give a {this.props.action} to</p>
                <p className="TCall TCperson">{this.props.to}</p>
                <p className="TCall TCdate">{moment(this.props.date).fromNow()}</p>
              </div>
            </div>
          </Link >
        </div>
      )
    } else if (this.state.action === "meeting") {
      return (
        <div className="contact-card-container">
          <Link to={`/tasks/${this.props.id}`}>
            <div className="TCcontainer">
              <div>
                <img src="/images/people_24px.png" alt="" />
              </div>
              <div className="TCTextContainer">
                <p className="TCall TCaction">Have a {this.props.action} with</p>
                <p className="TCall TCperson">{this.props.to}</p>
                <p className="TCall TCdate">{moment(this.props.date).fromNow()}</p>
              </div>
            </div>
          </Link >
        </div>
      )
    }

  }


}

export default withAuth()(TasksCard);