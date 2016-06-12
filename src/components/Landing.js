import React from 'react'
import styles from '../styles/landing.styl'

const contstraints = { audio: true, video: true }
const pcConfig = { 'iceServers': [{ 'url': 'stun:stun.services.mozilla.com' }, { 'url': 'stun:stun.l.google.com:19302' }] }

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { roomName: props.roomName }
    this.init()
  }
  init() {
    socket.on('local.res.isCaller', this.isCallerResponse.bind(this))
    socket.on('remote.description', this.onRemoteDescription.bind(this))
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
    window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription
  }
  handleChange(e) {
    this.setState({ roomName: e.target.value })
  }
  onSubmit() {
    if (this.isValid()) {
      this.joinRoom()
    }
  }
  joinRoom() {
    navigator.getUserMedia(contstraints, this.onUserMedia.bind(this), this.onError.bind(this))
  }
  onUserMedia(stream) {
    this.state.localStream = stream
    this.bindPcEvents()
  }
  bindPcEvents() {
    this.pc = new RTCPeerConnection(pcConfig)
    this.pc.onicecandidate = this.onIceCandidate.bind(this)
    this.pc.onaddstream = this.onRemoteStream.bind(this)
    this.pc.addStream(this.state.localStream)
    this.isCaller()
  }
  isCaller() {
   socket.emit('local.req.isCaller', this.state.roomName)
  }
  isCallerResponse(isCaller) {
    if (isCaller) {
      this.pc.createOffer(this.onDescription.bind(this), this.onError.bind(this))
    }
  }
  onDescription(e) {
    this.pc.setLocalDescription(e, () => {
      socket.emit('local.description', e, this.state.roomName)
    })
  } 
  onRemoteDescription(e) {
    console.log('on remote description', e)
  }
  onIceCandidate(e) {
    if (e.candidate !== null) {
      socket.emit('local.candidate', e, this.state.roomName)
    } 
  }
  onRemoteStream(e) {
    console.log('got remote stream', e.stream)
  }
  onError(err) {
    throw new Error(err)
  }
  isValid() {
    return this.state.roomName.length && /^[a-zA-Z0-9-_]+$/.test(this.state.roomName)
  }
  render() {
    return (
      <div className={styles.wrap}>

        <div id='videoWrap'></div>

        {/* Logo */ }                  
        <p className={styles.logo}>room baby</p>
        
        {/* Start Form Wrap */ }                  
        <div className={styles.form}>
          
          {/* Input */ }          
          <input type='text' 
            value={this.state.roomName} 
            placeholder='enter room' 
            onChange={this.handleChange.bind(this)}/>
          
          {/* Button */ }
          <div className={styles.btn} onClick={this.onSubmit.bind(this)}>join</div>
        </div>
        {/* End Form Wrap */ }
      </div>
    )
  }
}

Landing.propTypes = { roomName: React.PropTypes.string }
Landing.defaultProps = { roomName: '' }