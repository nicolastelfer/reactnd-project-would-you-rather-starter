// Action Types
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

// Login Action Creators
export const loginUser = (user) =>{
  return {
    type: LOGIN_USER,
    user
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}