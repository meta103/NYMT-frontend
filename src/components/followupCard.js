import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import moment from 'moment';
import task from '../lib/task-service';

class FollowUpCard extends Component {
  state = {
    taskId: this.props.id,
    action: this.props.action,
    reload: this.props.reload,
  }

  handleForFollowUpStatus = (e) => {
    const statusObjects = {
      id: this.state.taskId,
      status: e.target.value
    };
    task.updateOpportunityStatus(statusObjects)
      .then(() => {
        this.state.reload()
      })
  }

  handleTypeOfAction = () => {
    if (this.state.action === "email") {
      return (
        <Link to={`/tasks/${this.props.id}`}>
          <p className="FUCtext">Did {this.props.to} like the proposal you sent by {this.props.action} {moment(this.props.donedate).fromNow()}?</p>
        </Link >
      )
    } else if (this.state.action === "call") {
      return (
        <Link to={`/tasks/${this.props.id}`}>
          <p className="FUCtext">Have you got the deal with {this.props.to} after the {this.props.action} you had {moment(this.props.donedate).fromNow()}?</p>
        </Link >
      )
    } else if (this.state.action === "meeting") {
      return (
        <Link to={`/tasks/${this.props.id}`}>
          <p className="FUCtext">Has the {this.props.action} with {this.props.to} {moment(this.props.donedate).fromNow()} gone well?</p>
        </Link >
      )
    }
  }

  render() {
    return (
      <div className="follow-up-container">
        <div className="FUCcontainer">
          <div className="FUCtextcontainer">
            {this.handleTypeOfAction()}
          </div>
          <div className="FUCbuttonscontainer">
            <button className="FUCgreenbutton" onClick={this.handleForFollowUpStatus} value="won">YES</button>
            <button className="FUCpinkbutton" onClick={this.handleForFollowUpStatus} value="lost">NO</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth()(FollowUpCard);