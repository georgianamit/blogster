import { SET_ERRORS } from 'types/actions/error'
import { AppActions } from 'types/actions'

interface IErrorsState {
  username?: string
  email?: string
  password?: string
}
const initialState: IErrorsState = {}

const errorReducers = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    default:
      return state
  }
}

export default errorReducers
