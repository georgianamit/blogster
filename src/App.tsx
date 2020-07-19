import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './store/actions/authActions'

import LoginPage from './containers/auth/login-page'
import SignUpPage from './containers/auth/signup-page'

import ProgressBar from './containers/layout/progress-bar'
import Navbar from './containers/layout/nav-bar'
import Landing from './components/layout/landing'
import BlogPage from './containers/blog-page'
import PrivateRoute from './utils/private-route'

import ViewPostPage from './containers/posts/view-post-page'
import CreatePostPage from './containers/posts/create-post-page'
import UpdatePostPage from './containers/posts/update-post-page'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)
  const decoded: any = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch<any>(logoutUser())
    window.location.href = './loginPage'
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ProgressBar />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/blog" component={BlogPage} />
          <PrivateRoute exact path="/blog/post/create" component={CreatePostPage} />
          <PrivateRoute exact path="/blog/post/update/:id" component={UpdatePostPage} />
          <Route exact path="/blog/post/:id" component={ViewPostPage} />
          <Route path="/blog/:author" component={BlogPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
