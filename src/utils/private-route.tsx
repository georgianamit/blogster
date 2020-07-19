import React from 'react'
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from 'store'

type ownProps = {
  component: React.ReactNode
} & RouteProps

type Props = ownProps & ReturnType<typeof mapStateToProps>
const PrivateRoute = ({ component: Component, auth, ...rest }: Props) => {
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (auth.isAuthenticated) {
      return <Component {...props} />
    }
    return <Redirect to={{ pathname: '/login' }} />
  }

  return <Route {...rest} render={render} />
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
