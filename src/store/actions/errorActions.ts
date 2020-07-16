import { SET_ERRORS } from 'types/actions/error'
import { IErrors } from '../../types/state/error'
import { AppActions } from 'types/actions'

export const setErrors = (errors: IErrors): AppActions => {
  return {
    type: SET_ERRORS,
    payload: errors,
  }
}

export const clearErrors = (): AppActions => {
  return {
    type: SET_ERRORS,
    payload: {},
  }
}
