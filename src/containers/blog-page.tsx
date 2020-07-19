import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from '../components/user/blog'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { getPostsByAuthor, getPosts } from '../store/actions/postActions'
import { bindActionCreators } from 'redux'
import { AppState } from 'store'

type ownProps = { match?: any }
type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const BlogPage = ({ isAuthenticated, getPostsByAuthor, getPosts, match, posts }: Props) => {
  useEffect(() => {
    isAuthenticated ? getPosts() : getPostsByAuthor(match.params.author)
  }, [isAuthenticated, getPosts, getPostsByAuthor, match])

  return <Blog posts={posts} auth={isAuthenticated} />
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  getPostsByAuthor: bindActionCreators(getPostsByAuthor, dispatch),
  getPosts: bindActionCreators(getPosts, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)
