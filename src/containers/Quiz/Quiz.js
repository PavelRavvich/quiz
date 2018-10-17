import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {
  fetchQuizById, 
  quizAnswerClick, 
  retryQuiz
} from '../../store/actions/quiz';

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответье на все вопросы</h1>
          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              : this.props.isFinished
              ? <FinishedQuiz
                onRetry={this.props.retryQuiz}
                results={this.props.results}
                quiz={this.props.quiz}
              />
              : <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion].question}
                answers={this.props.quiz[this.props.activeQuestion].answers}
                answerNumber={this.props.activeQuestion + 1}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                state={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz.quiz,
    results: state.quiz.results,
    loading: state.quiz.loading,
    isFinished: state.quiz.isFinished,
    answerState: state.quiz.answerState,
    activeQuestion: state.quiz.activeQuestion
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);