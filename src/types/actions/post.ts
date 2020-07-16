import { IPost } from '../state'

export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_POST = 'GET_POST'
export const TOGGLE_POST_LOADING = 'POST_LOADING'
export const GET_POSTS = 'GET_POSTS'
export const RESET_POST = 'RESET_POST'
export const TOGGLE_POSTS_LOADING = 'POSTS_LOADING'

export interface GetPostAction {
  type: typeof GET_POST
  payload: IPost
}

export interface GetPostsAction {
  type: typeof GET_POSTS
  payload: IPost[]
}

export interface UpdatePostAction {
  type: typeof UPDATE_POST
  payload: IPost
}

export interface DeletePostAction {
  type: typeof DELETE_POST
  payload: string
}

export interface CreatePostAction {
  type: typeof CREATE_POST
  payload: IPost
}

export interface TogglePostLoadingAction {
  type: typeof TOGGLE_POST_LOADING
}

export interface TogglePostsLoadingAction {
  type: typeof TOGGLE_POSTS_LOADING
}

export interface ResetPostAction {
  type: typeof RESET_POST
}

export type PostActionTypes =
  | GetPostAction
  | UpdatePostAction
  | DeletePostAction
  | CreatePostAction
  | GetPostsAction
  | TogglePostLoadingAction
  | TogglePostsLoadingAction
  | ResetPostAction
