import { JOIN_ROOM } from '../constants/ActionTypes'

var initialState = { path: '' }

export default function connect(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      console.log('join room, path', action.data)
    default:
      return state
  }
}
