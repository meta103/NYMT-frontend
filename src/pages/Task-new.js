import React, { Component } from 'react';
//import { Redirect } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import task from '../lib/task-service';
import { withAuth } from '../components/AuthProvider';
import { Redirect } from 'react-router';
// import { FormDropdown } from 'semantic-ui-react';

class NewTask extends Component {
  state = {
    owner: this.props.user._id,
    action: 'hola',
    to: this.props.location.state.referrer2,
    toId: this.props.location.state.referrer,
    date: '',
    notes: '',
    redirect: false,
    status: 'pending',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { owner, action, to, toId, date, notes, status } = this.state;
    task.create({ owner, action, to, toId, date, notes, status })
      .then((data) => {
        return this.setState({
          redirect: true
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { action, to, date, notes, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/tasks" />
    }
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label><h2>Select the action</h2></Form.Label>
          <Form.Control name="action" as="select" value={action} onChange={this.handleChange}>
            <option>Choose...</option>
            <option>email</option>
            <option>call</option>
            <option>meeting</option>
          </Form.Control>
        </Form.Group>
        <Form.Group >
          <Form.Label><h2>To?</h2></Form.Label>
          <Form.Control name="to" type="text" value={to} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label><h2>When?</h2></Form.Label>
          <Form.Control name="date" type="datetime-local" label="Check me out" value={date} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label><h2>Add some notes</h2></Form.Label>
          <Form.Control type="text" name="notes" as="textarea" rows="3" value={notes} placeholder='Write a description of the task' onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="addtask-done-button">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withAuth()(NewTask);