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


}

const task = new Task();

export default task