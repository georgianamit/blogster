import {
  RESET_POST,
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
} from 'types/actions/post'
import { AppActions } from 'types/actions'
import { IPost } from 'types/state'
interface IState {
  post: IPost
  posts: IPost[]
  postLoading: boolean
  postsLoading: boolean
}
const initialState: IState = {
  post: {},
  posts: [],
  postLoading: false,
  postsLoading: false,
}

const postReducers = (state: IState = initialState, action: AppActions) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case GET_POSTS:
      return {
        ...state,
        post: {},
        posts: [...action.payload],
      }
    case GET_POST:
      return {
        ...state,
        post: { ...action.payload },
      }
    case UPDATE_POST:
      const posts = state.posts.filter((post: IPost) => post._id !== action.payload._id)
      return {
        ...state,
        post: {},
        posts: [...posts, action.payload],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: IPost) => post._id !== action.payload),
      }
    case TOGGLE_POST_LOADING:
      return {
        ...state,
        postLoading: !state.postLoading,
      }
    case TOGGLE_POSTS_LOADING:
      return {
        ...state,
        postsLoading: !state.postsLoading,
      }
    case RESET_POST:
      return initialState
    default:
      return state
  }
}

export default postReducers
