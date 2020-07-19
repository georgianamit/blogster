import React, { useState, useEffect } from 'react'
import Login from '../../components/auth/login'
import Validate from '../../components/form/validation'
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import { ThunkDispatch } from 'redux-thunk'
import { bindActionCreators } from 'redux'

type ownProps = {
  history?: any
}

type Props = ownProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

type State = {
  email: string
  password: string
  errors: {
    email?: string
    password?: string
  }
}
const LoginPage = ({ loginUser, auth, errors, history, clearErrors }: Props) => {
  const [user, setUser] = useState<State>({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const unlisten = history.listen(() => clearErrors())
    if (localStorage.loginMessage) {
      setMessage(localStorage.loginMessage)
      localStorage.setItem('loginMessage', '')
    }
    return () => unlisten()
  }, [history, clearErrors])

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/blog')
    }
    setUser({ ...user, errors })
  }, [auth, errors, history])

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleBlur = (e: any) => {
    const { name, value } = e.target
    const error = { ...user.errors, ...Validate(name, value).errors }
    setUser({ ...user, errors: { ...error } })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { email, password } = user
    loginUser({ email, password })
  }

  return (
    <Login
      message={message}
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
  loginUser: bindActionCreators(loginUser, dispatch),
  clearErrors: () => bindActionCreators(clearErrors, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
