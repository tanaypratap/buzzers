/**
 * @author Shashank
 * @description  This is the App Container
 */
import React, { Component } from 'react';
import './App.css';
import Quiz from './quiz';
import {connect} from 'react-redux';
import * as Actions from './actions/workActions';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1> Start putting your code here </h1>
        <button onClick={this.props.sendTheAlert}>Click</button>
        <Quiz></Quiz>
      </div>
    );
  }
}

function mapStateToProps(state){
  return({
    todos: state
  })
};

function mapDispatchToProps(dispatch){
  return({
    sendTheAlert: () => {dispatch(Actions.doSomething())}
  })
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
