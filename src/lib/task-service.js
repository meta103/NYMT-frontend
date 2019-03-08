import axios from 'axios';

class Task {
  constructor() {
    this.tasks = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  create(task) {
    const { owner, action, to, toId, date, notes } = task;
    return this.tasks.post('/tasks/new', { owner, action, to, toId, date, notes })
      .then(({ data }) => {
        return data
      })
  }

  showTasksList(userId) {
    return this.tasks.get('/tasks/list', userId)
      .then(({ data }) => data)
  }

  showTasksDetails(taskId) {
    return this.tasks.get(`/tasks/details/${taskId}`)
      .then(({ data }) => data[0])
  }

  updateStatus(taskId) {
    return this.tasks.put(`/tasks/details/${taskId}`)
      .then(({ data }) => data)
  }

  updateOpportunityStatus(object) {
    return this.tasks.put('/tasks/opp', object)
      .then(({ data }) => data)
  }
}

const task = new Task();

export default task