import React, { Component, PropTypes } from 'react';
import Landing from './Landing'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../main.styl'
import * as ConnectActions from '../actions/ConnectActions';

export default class App extends React.Component {
  constructor(props, context) {
   super(props, context)
  }
  render() {
    const { actions } = this.props    
    return (
      <div className={styles.app}>
        <Landing actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConnectActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);