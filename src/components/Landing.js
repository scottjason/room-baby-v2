import React from 'react'
import styles from '../styles/landing.styl'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { roomName: props.roomName }
  }
  handleChange(e) {
     this.setState({ roomName: e.target.value })    
  }
  onSubmit() {
    if (this.isValid()) {
      this.props.actions.joinRoom()
    } else {
      console.log('invalid')
    }
  }
  isValid() {
    return this.state.roomName.length && this.isValidPath(this.state.roomName)
  }
  isValidPath(str) {
    return /^[a-zA-Z0-9-_]+$/.test(str)
  }
  render() {

    return (
      <div className={styles.wrap}>

        {/* Logo */ }                  
        <p className={styles.logo}>room baby</p>
        
        {/* Start Form Wrap */ }                  
        <div className={styles.form}>
          
          {/* Input */ }          
          <input type='text' 
            value={this.state.roomName} 
            placeholder='room name' 
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