// API functions
import { saveQuestionAnswer } from '../utils/api'
import { RECEIVE_USERS, SAVE_QUESTION, ADD_QUESTION } from './types'

// Users Action Creators
export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }

}

export const saveAnswer = (loginUser, qid, answer) => {
  return {
    type: SAVE_QUESTION,
    loginUser,
    qid,
    answer
  }
}

export const addQuestion = (loginUser, qid) => {
  return {
    type: ADD_QUESTION,
    loginUser,
    qid
  }
}

// With Thunk middleware
export function handleSaveAnswerUser(qid, answer) {
  return (dispatch, getState) => {

    const { loginUser } = getState()

    return saveQuestionAnswer({
      authedUser: loginUser,
      qid,
      answer
    })
      .then(() => dispatch(saveAnswer(loginUser, qid, answer)))
  }
}