import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { configStore } from './stores';
import App from './components/App.js'

const Root = connect()(App)
const store = configStore()

ReactDOM.render(
  <Provider store={store}>
  <Root />
  </Provider>, 
  document.getElementById('root')
)