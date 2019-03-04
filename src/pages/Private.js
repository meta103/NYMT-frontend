import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import task from '../lib/task-service';

class Private extends Component {
  state = {
    callsCounter: '',
    emailsCounter: '',
    meetingsCounter: '',
    contacts: '',
    tasks: ''
  }

  componentDidMount = () => {
    const userId = this.props.user._id;
    task.showTasksList(userId)
      .then((data) => {
        let counterObject = {
          calls: 0,
          emails: 0,
          meetings: 0
        }
        data.forEach((task) => {
          if (task.action === "call") {
            return counterObject.calls++
          } else if (task.action === "email") {
            return counterObject.emails++
          } else if (task.action === "meeting") {
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
        })
      })
      .then(() => {
        console.log(this.state);
      })
      .catch(error => console.log(error))
  }

  render() {
    const { user } = this.props
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
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Conversion rate</th>
          </tr>
          <tr>
            <td>0%</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>To Follow up</th>
          </tr>
          <tr>
            <td>...</td>
          </tr>
        </table>
        {/* <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${user._id}&amp;size=250x250`} alt="" title="" thumbnail /> */}
      </div>
    )
  }
}

export default withAuth()(Private);