import { ITokenDecoded } from 'types/state'

export const TOGGLE_USER_LOADING = 'TOGGLE_USER_LOADING'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export interface ToggleUserLoadingAction {
  type: typeof TOGGLE_USER_LOADING
}

export interface TogglePostsLoadingAction {
  type: typeof TOGGLE_USER_LOADING
}

export interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER
  payload: ITokenDecoded
}

export type UserActionTypes = ToggleUserLoadingAction | SetCurrentUserAction
