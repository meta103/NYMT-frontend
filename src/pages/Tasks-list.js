import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import TasksCard from '../components/TasksCard';

class Taskslist extends Component {

  state = {
    pendingTasksArray: [],
    doneTasksArray: [],
    wonTasksArray: [],
    lostTasksArray: [],
    currentFilter: [],
  }

  handleChangeForFiltering = (e) => {
    const selectedvalue = e.target.value;
    if (selectedvalue === "done") {
      return this.setState({
        currentFilter: this.state.doneTasksArray
      })
    } else if (selectedvalue === "won") {
      return this.setState({
        currentFilter: this.state.wonTasksArray
      })

    } else if (selectedvalue === "lost") {
      return this.setState({
        currentFilter: this.state.lostTasksArray
      })

    } else if (selectedvalue === "pending") {
      return this.setState({
        currentFilter: this.state.pendingTasksArray
      })

    }

  }

  componentDidMount = () => {
    const userId = this.props.user._id;
    task.showTasksList(userId)
      .then((data) => {
        let pendingTasks = data.filter(task => task.status === "pending")
        let doneTasks = data.filter(task => task.status === "done")
        let wonTasks = data.filter(task => task.status === "won")
        let lostTasks = data.filter(task => task.status === "lost")
        return this.setState({
          pendingTasksArray: pendingTasks,
          doneTasksArray: doneTasks,
          wonTasksArray: wonTasks,
          lostTasksArray: lostTasks,
          currentFilter: pendingTasks,
        })
      })
      .then(() => {
        console.log(this.state)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div className="filter-button-flex">
          <select name="select" id="filter" onChange={this.handleChangeForFiltering} className="task-filter">
            <option value="pending" selected>Pending tasks</option>
            <option value="done">Done tasks</option>
            <option value="won">Won opportunities</option>
            <option value="lost">Lost opportunities</option>
          </select>
          <img src="/images/filtericon.png" alt="" />
        </div>
        {this.state.currentFilter.map((task) => {
          return <TasksCard id={task._id} action={task.action} to={task.toName} date={task.date} status={task.status} />
        })}
      </div>
    )
  }
}




export default withAuth()(Taskslist);