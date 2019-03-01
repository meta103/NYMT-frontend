import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class TasksCard extends Component {
  render() {
    return (
      <Link to={`/tasks/${this.props.id}`}>

        <h1>Don't forget to {this.props.action}</h1>
        <h2>{this.props.to}</h2>
        <p>on {this.props.date}</p>

      </Link >

    )

  }


}

export default withAuth()(TasksCard);