import React from 'react'
import { Provider } from 'react-redux'
import './App.scss'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1> Welcome to Blogster</h1>
      </div>
    </Provider>
  )
}

export default App
