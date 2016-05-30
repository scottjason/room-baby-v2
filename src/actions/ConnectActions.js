import { JOIN_ROOM } from '../constants/ActionTypes'

export function join() {
  return {
    type: JOIN_ROOM
  }
}

export function joinRoom() {
  return dispatch => dispatch(join())
}
