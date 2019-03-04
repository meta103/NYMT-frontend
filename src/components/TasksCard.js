import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import moment from 'moment';

class TasksCard extends Component {
  render() {
    return (
      <Link to={`/tasks/${this.props.id}`}>

        <h1>Don't forget to {this.props.action}</h1>
        <h2>{this.props.to}</h2>
        <p>{moment(this.props.date).fromNow()}</p>
      </Link >

    )

  }


}

export default withAuth()(TasksCard);