import React, { Component } from 'react';
//import { Redirect } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import task from '../lib/task-service';
import { withAuth } from '../components/AuthProvider';
class NewTask extends Component {
  state = {
    owner: this.props.user._id,
    action: 'hola',
    to: this.props.location.state.referrer2,
    toId: this.props.location.state.referrer,
    date: '',
    notes: '',
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { owner, action, to, toId, date, notes } = this.state;
    task.create({ owner, action, to, toId, date, notes })
      .then((data) => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state)
  }

  render() {
    const { action, to, date, notes } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select the action</Form.Label>
          <Form.Control name="action" as="select" value={action} onChange={this.handleChange}>
            <option>Choose...</option>
            <option>email</option>
            <option>call</option>
            <option>meeting</option>
          </Form.Control>
        </Form.Group>

        <Form.Group >
          <Form.Label>To?</Form.Label>
          <Form.Control name="to" type="text" value={to} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>When?</Form.Label>
          <Form.Check name="date" type="date" label="Check me out" value={date} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>Add some notes</Form.Label>
          <Form.Control type="text" name="notes" as="textarea" rows="3" value={notes} placeholder='Write a description of the task' onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default withAuth()(NewTask);