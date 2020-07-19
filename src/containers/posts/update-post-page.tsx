import React, { useState, useEffect } from 'react'
import PostForm from '../../components/posts/post-form'
import Validate from '../../components/form/validation'
import { connect } from 'react-redux'
import { getPostByID, updatePost } from '../../store/actions/postActions'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { bindActionCreators } from 'redux'
import { AppState } from 'store'

type ownProps = { history?: any; match: any }
type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const UpdatePostPage = ({ errors, updatePost, loading, currentPost, getPostByID, match, history }: Props) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    errors: {},
  })

  useEffect(() => {
    getPostByID(match.params.id)
  }, [match, getPostByID])

  // updating the local state of post with the received post data
  useEffect(() => {
    setPost((post) => ({
      title: currentPost.title,
      body: currentPost.body,
      errors: { ...post.errors },
    }))
  }, [currentPost])

  useEffect(() => {
    setPost((post) => {
      return { ...post, errors }
    })
  }, [errors])

  const handleChange = (e: any) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const handleBlur = (e: any) => {
    const { name, value } = e.target
    const error = { ...post.errors, ...Validate(name, value).errors }
    setPost({ ...post, errors: { ...error } })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { title, body } = post
    updatePost(currentPost._id, { title, body }, history)
  }

  // to ensure that the post is loaded otherwise we would make uncontrolled form access error
  const isPostLoaded = () => {
    return post.title || post.body || Object.keys(post.errors).length > 0
  }

  return isPostLoaded() ? (
    <PostForm loading={loading} post={post} onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} />
  ) : (
    <div />
  )
}

const mapStateToProps = (state: AppState) => ({
  currentPost: state.post.post,
  loading: state.post.postLoading,
  errors: state.errors,
})
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  updatePost: bindActionCreators(updatePost, dispatch),
  getPostByID: bindActionCreators(getPostByID, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePostPage)
