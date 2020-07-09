import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from './types'
import { resetPost } from './postActions'
import { setErrors } from './errorActions'

// export interface IUserData {}

export const registerUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch(toggleUserLoading())
  axios
    .post('/api/users/signup', userData)
    .then((res) => {
      dispatch(toggleUserLoading())
      localStorage.setItem('loginMessage', 'Successfully registered. Login to continue')
      history.push('/login')
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(toggleUserLoading())
    })
}

export const loginUser = (userData: any) => (dispatch: any) => {
  dispatch(toggleUserLoading())
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      dispatch(resetPost())
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(toggleUserLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(toggleUserLoading())
    })
}

export const setCurrentUser = (userData: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  }
}

export const toggleUserLoading = () => {
  return {
    type: TOGGLE_USER_LOADING,
  }
}

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
