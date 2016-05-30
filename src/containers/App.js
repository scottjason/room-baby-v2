import React, { Component, PropTypes } from 'react';
import Landing from '../components/Landing'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../main.styl'
import * as ConnectActions from '../actions/ConnectActions'

window.socket = io.connect()

export default class App extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    const { actions, connect } = this.props
    return (
      <div className={styles.app}>
        <Landing actions={actions} connect={connect} />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    connect: state.connect
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConnectActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)