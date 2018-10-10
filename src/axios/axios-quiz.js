import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-17f6c.firebaseio.com/'
})