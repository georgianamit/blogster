import React from 'react'
import Progress from '../../components/layout/progress'
import { connect } from 'react-redux'
import { AppState } from 'store'

type Props = ReturnType<typeof mapStateToProps>
const ProgressBar = ({ loading }: Props) => {
  return loading ? <Progress /> : <div />
}

const mapStateToProps = (state: AppState) => ({
  loading: state.auth.userLoading || state.post.postLoading || state.post.postsLoading,
})

export default connect(mapStateToProps)(ProgressBar)
