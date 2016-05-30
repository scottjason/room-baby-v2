import { JOIN_ROOM } from '../constants/ActionTypes'

export function join(path) {
  return {
    type: JOIN_ROOM,
    data: {
      path: path
    }
  }
}

export function joinRoom(path) {
  return dispatch => dispatch(join(path))
}
