import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';
import FollowUpCard from '../components/followupCard';
import Chart from '../components/Chart';

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
    loaded: false,
  }

  handleColorBox = (number) => {
    if (number !== 0) {
      return "smallbox pink"
    } else {
      return "smallbox green"
    }
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
      .then(() => {
        this.setState({
          loaded: true,
        })
      })

      .catch(error => console.log(error))
  }

  render() {
    const { callsCounter, emailsCounter, meetingsCounter, contacts, tasks, conversionratio, won, lost, tasksdone, loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <h2>My schedule</h2>
          <div className="flex-small-boxes">
            <div className={this.handleColorBox(callsCounter)}>
              <h1>{callsCounter}</h1>
              <p>CALLS</p>
            </div>
            <div className={this.handleColorBox(emailsCounter)}>
              <h1>{emailsCounter}</h1>
              <p>EMAILS</p>
            </div>
            <div className={this.handleColorBox(meetingsCounter)}>
              <h1>{meetingsCounter}</h1>
              <p>MEETINGS</p>
            </div>
          </div>

          <h2>My stats</h2>
          <div className="flex-small-boxes">
            <div className="middlebox">
              <h1 className="middleboxheader">{contacts}</h1>
              <p className="middleboxtext">CONTACTS</p>
            </div>
            <div className="middlebox">
              <h1 className="middleboxheader pink-text">{tasks}</h1>
              <p className="middleboxtext">TASKS</p>
            </div>
          </div>

          <div className="chart-text-container">
            <Chart rate={Math.round(conversionratio * 100)} />
            <div className="chartdetails">
              <h1 className="chartheader">{Math.round(conversionratio * 100)}%</h1>
              <p className="charttext">CONVERSION RATE</p>
            </div>
          </div>

          <div className="flex-small-boxes">
            <div className="middlebox">
              <h1 className="middleboxheader">{won}</h1>
              <p className="middleboxtext">WON</p>
            </div>
            <div className="middlebox">
              <h1 className="middleboxheader pink-text">{lost}</h1>
              <p className="middleboxtext">LOST</p>
            </div>
          </div>

          <h1>Follow up</h1>
          {
            tasksdone.map((task) => {
              return <FollowUpCard id={task._id} action={task.action} to={task.toName} status={task.status} donedate={task.updated_at} reload={() => this.componentDidMount()} />
            })
          }
        </div >
      )
    } else {
      return (
        <div>
          loading...
        </div>
      )
    }
  }
}

export default withAuth()(Private);