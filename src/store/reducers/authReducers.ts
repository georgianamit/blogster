import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from 'types/actions/user'
import isEmpty from 'is-empty'
import { AppActions } from 'types/actions'
import { IUser } from 'types/state/user'

interface IState {
  isAuthenticated: boolean
  user: IUser | {}
  userLoading: boolean
}

const initialState: IState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
}

const authReducers = (state: IState = initialState, action: AppActions) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case TOGGLE_USER_LOADING:
      return {
        ...state,
        userLoading: !state.userLoading,
      }
    default:
      return state
  }
}

export default authReducers
