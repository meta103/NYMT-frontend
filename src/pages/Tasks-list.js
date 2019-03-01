import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import TasksCard from '../components/TasksCard';

class Taskslist extends Component {

  state = {
    tasksArray: [],
  }

  componentDidMount = () => {
    const userId = this.props.user._id;
    task.showTasksList(userId)
      .then((data) => {
        return this.setState({
          tasksArray: data,
          isloaded: true,
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
        <h1>Pending tasks</h1>
        {this.state.tasksArray.map((task) => {
          return <TasksCard id={task._id} action={task.action} to={task.toName} date={task.date} />
        })}
      </div>
    )
  }
}




export default withAuth()(Taskslist);