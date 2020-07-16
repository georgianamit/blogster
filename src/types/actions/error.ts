export const SET_ERRORS = 'SET_ERRORS'
import { IErrors } from '../state/error'

export interface SetErrorsAction {
  type: typeof SET_ERRORS
  payload: IErrors
}

export interface ClearErrorsAction {
  type: typeof SET_ERRORS
  payload: IErrors
}

export type ErrorActionTypes = SetErrorsAction | ClearErrorsAction
