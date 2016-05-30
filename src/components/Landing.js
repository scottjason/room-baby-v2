import React from 'react'
import styles from '../styles/landing.styl'

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { path: props.path }
  }
  handleChange(e) {
     this.setState({ path: e.target.value })    
  }
  onSubmit() {
    if (this.isValid()) {
      this.props.actions.joinRoom(this.state.path)
    } else {
      console.log('invalid')
    }
  }
  isValid() {
    return this.state.path.length && /^[a-zA-Z0-9-_]+$/.test(this.state.path)
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
            value={this.state.path} 
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

Landing.propTypes = { path: React.PropTypes.string }
Landing.defaultProps = { path: '' }