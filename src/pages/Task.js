import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
          <h3 className="task-title" >Action:</h3>
          <p className="task-detail" >{this.state.action}</p>
          <h3 className="task-title">To</h3>
          <p className="task-detail">{this.state.to}</p>
          <h3 className="task-title">Date:</h3>
          <p className="task-detail">{moment(this.state.date).format('MMMM Do YYYY, HH:mm')}</p>
          <h3 className="task-title">Notes:</h3>
          <p className="task-detail">{this.state.notes}</p>
          <Button onClick={this.handleForTaskDone} className="addtask-done-button" >DONE</Button>
        </div>
      )

    }
  }
}




export default withAuth()(Task);