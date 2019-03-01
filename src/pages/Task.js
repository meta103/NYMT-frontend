import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';

class Task extends Component {

  state = {
    taskId: this.props.match.params.id,
    action: '',
    to: '',
    date: '',
    notes: '',
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
        })
      })
      .then(() => {
        console.log(this.state.tasksArray)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1>Task details:</h1>
        <h3>Action:</h3>
        <p>{this.state.action}</p>
        <h3>To</h3>
        <p>{this.state.to}</p>
        <h3>Date:</h3>
        <p>{this.state.date}</p>
        <h3>Notes:</h3>
        <p>{this.state.notes}</p>
      </div>
    )
  }
}




export default withAuth()(Task);