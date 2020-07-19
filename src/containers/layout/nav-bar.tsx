import React from 'react'
import NavigationBar from '../../components/layout/navigation-bar'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { logoutUser } from '../../store/actions/authActions'
import { bindActionCreators } from 'redux'
import { AppState } from 'store'

type ownProps = {}
type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Navbar = ({ auth, logoutUser }: Props) => {
  const handleClick = (e: any) => {
    e.preventDefault()
    logoutUser()
  }
  return <NavigationBar auth={auth.isAuthenticated} onClick={handleClick} />
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  logoutUser: bindActionCreators(logoutUser, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
