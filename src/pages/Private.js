import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import FollowUpCard from '../components/followupCard'

class Private extends Component {
  state = {
    callsCounter: '',
    emailsCounter: '',
    meetingsCounter: '',
    contacts: '',
    tasks: '',
    won: '',
    lost: '',
    conversionratio: 0,
    tasksdone: [],
  }

  componentDidMount = () => {
    const userId = this.props.user._id;
    task.showTasksList(userId)
      .then((data) => {
        let donefilter = data.filter(task => task.status === "done");
        let wonfilter = data.filter(task => task.status === "won");
        let lostfilter = data.filter(task => task.status === "lost");
        let ratio = wonfilter.length / data.length;
        let counterObject = {
          calls: 0,
          emails: 0,
          meetings: 0,
          won: wonfilter.length,
          lost: lostfilter.length,
          ratio: ratio,
          done: donefilter
        }
        data.forEach((task) => {
          if (task.action === "call" && task.status === "pending") {
            return counterObject.calls++
          } else if (task.action === "email" && task.status === "pending") {
            return counterObject.emails++
          } else if (task.action === "meeting" && task.status === "pending") {
            return counterObject.meetings++
          }
        });
        return counterObject;
      })
      .then((counterObject) => {
        return this.setState({
          callsCounter: counterObject.calls,
          emailsCounter: counterObject.emails,
          meetingsCounter: counterObject.meetings,
          contacts: this.props.user.contacts.length,
          tasks: counterObject.calls + counterObject.emails + counterObject.meetings,
          won: counterObject.won,
          lost: counterObject.lost,
          conversionratio: counterObject.ratio,
          tasksdone: counterObject.done,
        })
      })
      // .then(() => {
      //   console.log(this.state);
      // })
      .catch(error => console.log(error))
  }

  render() {
    const { user } = this.props;
    const { tasksdone } = this.state;
    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <h2>My schedule</h2>
        <table>
          <tr>
            <th>Calls</th>
            <th>Emails</th>
            <th>Meetings</th>
          </tr>
          <tr>
            <td>{this.state.callsCounter}</td>
            <td>{this.state.emailsCounter}</td>
            <td>{this.state.meetingsCounter}</td>
          </tr>
        </table>
        <h2>My stats</h2>
        <table>
          <tr>
            <th>Contacts</th>
            <th>Tasks</th>
          </tr>
          <tr>
            <td>{this.state.contacts}</td>
            <td>{this.state.tasks}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Won opps</th>
            <th>Lost opps</th>
          </tr>
          <tr>
            <td>{this.state.won}</td>
            <td>{this.state.lost}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Conversion rate</th>
          </tr>
          <tr>
            <td>{Math.round(this.state.conversionratio * 100)}%</td>
          </tr>
        </table>
        <h1>Follow up</h1>
        {tasksdone.map((task) => {
          return <FollowUpCard id={task._id} action={task.action} to={task.toName} status={task.status} donedate={task.updated_at} reload={() => this.componentDidMount()} />
        })}
      </div>

    )
  }
}

export default withAuth()(Private);