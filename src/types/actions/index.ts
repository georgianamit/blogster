import { PostActionTypes } from './post'
import { UserActionTypes } from './user'
import { ErrorActionTypes } from './error'

export type AppActions = PostActionTypes | UserActionTypes | ErrorActionTypes
