const initialState = { path: '', streams: [] }
const contstraints = { audio: true, video: true }
const pcOpts = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] }

import { JOIN_ROOM } from '../constants/ActionTypes'

export default function connect(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      join(action.data.path, state)
    default:
      return state
  }
}

function join(roomName, state) {

  function getUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia
    navigator.getUserMedia(contstraints, onSuccess.bind(this), onError.bind(this))
  }

  function onError(err) {
    console.log('error getting user media', err)
  }

  function onSuccess(stream) {
    setPeer()
    setStream(stream)
    addStream(stream)
    compose()
  }

  function compose() {
    createOffer((sdp) => sendOffer(sdp, (isEmpty) => {
      if (isEmpty)
        joinEmptyRoom()
    }))
  }

  function setStream(stream) {
    state.streams.push(stream)
  }

  function setPeer() {
    state.peer = new(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection)(pcOpts)
  }

  function addStream(stream) {
    state.peer.addStream(stream)
  }

  function createOffer(cb) {
    state.peer.createOffer((offer) => {
      state.peer.setLocalDescription(offer, () => {
        cb(offer.sdp)
      }, onError)
    }, onError)
  }

  function offerMsg(sdp) {
    return {
      type: 'createOffer',
      sdp: sdp,
      roomName: roomName
    }
  }

  function sendOffer(sdp, cb) {
    var msg = offerMsg(sdp)
    window.socket.emit(msg.type, msg)
    window.socket.on('joinRoom', (room) => {
      if (room.isEmpty) {
        cb(true)
      }
    })
  }

  function joinEmptyRoom() {
    var stream = state.streams[0]
    var container = document.getElementById('videoWrap')
    var video = document.createElement('video')
    video.autoplay = true
    video.muted = true
    video.src = window.URL.createObjectURL(stream)
    container.appendChild(video)
  }

  function onError(er) {
    console.log(er)
  }
  getUserMedia()
}
