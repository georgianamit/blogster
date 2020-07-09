import { SET_ERRORS } from '../actions/types'
const initialState = {}
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    default:
      return state
  }
}
