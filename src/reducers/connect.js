const initialState = { path: '', streams: [] }
const contstraints = { audio: true, video: true }
const pcConfig = { 'iceServers': [{ 'url': 'stun:stun.services.mozilla.com' }, { 'url': 'stun:stun.l.google.com:19302' }] }

import { JOIN_ROOM } from '../constants/ActionTypes'

export default function connect(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
    default:
      return state
  }
}