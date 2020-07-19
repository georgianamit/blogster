import React, { useEffect } from 'react'
import ViewPost from '../../components/posts/view-post'
import { deletePost, getPostByID } from '../../store/actions/postActions'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { bindActionCreators } from 'redux'
import { AppState } from 'store'

type ownProps = { history?: any; match?: any }
type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const ViewPostPage = ({ auth, post, match, history, getPostByID, deletePost }: Props) => {
  useEffect(() => {
    getPostByID(match.params.id)
  }, [match, getPostByID])

  const handleEdit = () => {
    history.push(`/blog/post/update/${post._id}`)
  }

  const handleDelete = () => {
    deletePost(post._id, history)
  }

  if (Object.keys(post).length === 0) return <div />
  return <ViewPost post={post} auth={auth} onDelete={handleDelete} onEdit={handleEdit} />
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth.isAuthenticated,
  post: state.post.post,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  deletePost: bindActionCreators(deletePost, dispatch),
  getPostByID: bindActionCreators(getPostByID, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)
