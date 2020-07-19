import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from '../../types/actions/user'
import { resetPost } from './postActions'
import { setErrors } from './errorActions'
import { IUser, ITokenDecoded } from '../../types/state/user'
import { Dispatch } from 'react'
import { AppActions } from 'types/actions'

export const registerUser = (userData: IUser, history: any) => (dispatch: Dispatch<AppActions>) => {
  dispatch(toggleUserLoading())
  axios
    .post('user/signup', userData)
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

export const loginUser = (userData: { email: string; password: string }) => (dispatch: Dispatch<AppActions>) => {
  dispatch(toggleUserLoading())
  axios
    .post('user/login', userData)
    .then((res) => {
      dispatch(resetPost())
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded: ITokenDecoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(toggleUserLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(toggleUserLoading())
    })
}

export const setCurrentUser = (userData: ITokenDecoded): AppActions => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  }
}

export const toggleUserLoading = (): AppActions => {
  return {
    type: TOGGLE_USER_LOADING,
  }
}

export const logoutUser = () => (dispatch: Dispatch<AppActions>) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
