// API Functions
import { getInitialData } from '../utils/api'

import { showLoading, hideLoading } from 'react-redux-loading'

// Shared Action Creators
import { receiveUsers, addQuestion, handleSaveAnswerUser } from './users'
import { receiveQuestions, handleSaveAnswerQuestion, handleAddNewQuestion } from './questions'

// Handles sending the initial data to the Redux store
export const handleInitialData = () => {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
      })
  }
}

// Handles dispatching actions for votes in a question
export const handleSaveAnswer = (qid, answer) => {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(handleSaveAnswerQuestion(qid, answer))
    dispatch(handleSaveAnswerUser(qid, answer))
      .then(() =>
        dispatch(hideLoading())
      )
  }
}

// Handles dispatching actions for creating questions
export const handleAddQuestion = (optionOneText, optionTwoText, loginUser) => {
  return (dispatch) => {
    dispatch(showLoading())
    return dispatch(handleAddNewQuestion(optionOneText, optionTwoText))
      .then((question) => {
          dispatch(addQuestion(loginUser, question.question.id))
          dispatch(hideLoading())
        }
      )
  }
}