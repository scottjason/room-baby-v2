import React from 'react'
import Landing from './Landing'
import styles from '../main.styl'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={styles.app}>
        <Landing />
      </div>
    )
  }
}