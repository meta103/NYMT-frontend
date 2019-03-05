import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

class Task extends Component {

  state = {
    taskId: this.props.match.params.id,
    action: '',
    to: '',
    date: '',
    notes: '',
    status: '',
    redirect: false,
  }

  handleForTaskDone = () => {
    const { taskId } = this.state;
    task.updateStatus(taskId)
      .then((data) => {
        this.setState({
          status: data,
          redirect: true,
        });

      })
  }


  componentDidMount = () => {
    const { taskId } = this.state;
    task.showTasksDetails(taskId)
      .then((data) => {
        return this.setState({
          action: data.action,
          to: data.toName,
          date: data.date,
          notes: data.notes,
          status: data.status,
        })
      })
      .then(() => {
        console.log(this.state.tasksArray)
      })
      .catch(error => console.log(error))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/tasks' }} />

    } else {
      return (
        <div>
          <h1>Task details:</h1>
          <h3>Action:</h3>
          <p>{this.state.action}</p>
          <h3>To</h3>
          <p>{this.state.to}</p>
          <h3>Date:</h3>
          <p>{moment(this.state.date).format('MMMM Do YYYY, HH:mm')}</p>
          <h3>Notes:</h3>
          <p>{this.state.notes}</p>
          <button onClick={this.handleForTaskDone}>DONE</button>
        </div>
      )

    }
  }
}




export default withAuth()(Task);