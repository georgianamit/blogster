import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'
import Validate from '../../components/form/validation'
import SignUp from '../../components/auth/sign-up'
import { AppState } from 'store'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from 'types/actions'
import { bindActionCreators } from 'redux'

type ownProps = {
  history?: any
}

type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const SignUpPage = ({ history, registerUser, auth, errors, clearErrors }: Props) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    errors: {},
  })

  // clearing error incase user switches to login page while already having errors in login page
  useEffect(() => {
    const unlisten = history.listen(() => clearErrors())
    return () => unlisten()
  }, [history, clearErrors])

  useEffect(() => {
    if (auth.isAuthenticated) history.push('/blog')
    setUser((user) => {
      return { ...user, errors }
    })
  }, [errors, auth, history])

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleBlur = (e: any) => {
    const { name, value } = e.target
    const err = { ...user.errors, ...Validate(name, value).errors }
    setUser({ ...user, errors: { ...err } })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { username, email, password } = user
    registerUser({ username, email, password }, history)
  }

  return (
    <SignUp
      loading={auth.userLoading}
      user={{ ...user }}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: ownProps) => ({
  registerUser: bindActionCreators(registerUser, dispatch),
  clearErrors: bindActionCreators(clearErrors, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
