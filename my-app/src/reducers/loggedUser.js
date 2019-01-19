import { LOGIN_USER, LOGOUT_USER } from '../actions/loggedUser'

export default function loggedUser ( state = null, action ) {
  switch (action.type) {
    case LOGIN_USER :
      return action.user
    case LOGOUT_USER :
      return null
    default :
      return state
  }
} 