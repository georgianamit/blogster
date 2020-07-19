import React, { useState, useEffect } from 'react'
import PostForm from '../../components/posts/post-form'
import Validate from '../../components/form/validation'
import { connect } from 'react-redux'
import { createPost } from '../../store/actions/postActions'
import { AppState } from 'store'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { bindActionCreators } from 'redux'

type ownProps = { history?: any }
type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const CreatePostPage = ({ errors, createPost, loading, history }: Props) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    errors: {},
  })

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
    createPost({ title, body }, history)
  }

  return <PostForm loading={loading} post={post} onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} />
}

const mapStateToProps = (state: AppState) => ({
  loading: state.post.postLoading,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  createPost: bindActionCreators(createPost, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage)
