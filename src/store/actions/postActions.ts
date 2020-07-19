import axios from 'axios'
import { Dispatch } from 'redux'
import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POSTS_LOADING,
  TOGGLE_POST_LOADING,
  RESET_POST,
} from 'types/actions/post'
import { IPost } from 'types/state'
import { setErrors, clearErrors } from './errorActions'
import { AppActions } from 'types/actions'
import { IUser } from 'types/state/user'

export const createPost = (postData: IPost, history: any) => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostLoading())
  axios
    .post('/post/create', postData)
    .then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
      dispatch(togglePostLoading())
      history.push('/blog')
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const getPostByID = (id: string) => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostLoading())
  axios
    .get(`/post/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
      dispatch(clearErrors())
      dispatch(togglePostLoading())
    })

    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const getPostsByAuthor = (author: IUser) => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostsLoading())
  axios
    .get(`/post/author/${author}`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
      dispatch(togglePostsLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostsLoading())
    })
}

export const getPosts = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostsLoading())
  axios
    .get(`/post`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
      dispatch(clearErrors())
      dispatch(togglePostsLoading())
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostsLoading())
    })
}

export const updatePost = (id: string, postData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostLoading())
  axios
    .patch(`/post/update/${id}`, postData)
    .then((res) => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      })
      dispatch(togglePostLoading())
      history.push(`/blog/post/${res.data._id}`)
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const deletePost = (id: string, history: any) => (dispatch: Dispatch<AppActions>) => {
  dispatch(togglePostLoading())
  axios
    .delete(`/post/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
      dispatch(togglePostLoading())
      history.push('/blog')
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data))
      dispatch(togglePostLoading())
    })
}

export const resetPost = (): AppActions => {
  return {
    type: RESET_POST,
  }
}

export const togglePostLoading = (): AppActions => {
  return {
    type: TOGGLE_POST_LOADING,
  }
}

export const togglePostsLoading = (): AppActions => {
  return {
    type: TOGGLE_POSTS_LOADING,
  }
}
