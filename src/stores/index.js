import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = []

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

function config(initialState) {
  return finalCreateStore(rootReducer, initialState)
}

export const configStore = config