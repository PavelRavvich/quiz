import React, {Component} from 'react';
import classes from './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from 'axios'

class QuizList extends Component {

  state = {
    quizes: []
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const resp = await axios.get('https://react-quiz-17f6c.firebaseio.com/quizes.json');
      const quizes = [];
      Object.keys(resp.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });
      this.setState({
        quizes
      });
      console.log()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список тестов</h1>

        <ul>
          {this.renderQuizes()}
        </ul>
      </div>
    )
  }
}

export default QuizList;