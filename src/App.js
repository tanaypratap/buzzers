/**
 * @author Shashank
 * @description  This is the App Container
 */
import React, { Component } from 'react';
import './App.css';
import Quiz from './quiz';
import QuizQuestion from './quiz-question';
import {connect} from 'react-redux';
import * as Actions from './actions/workActions';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utils/material-ui-theme'

class App extends Component {

  render() {

    return (
      <div className="App">
        <button onClick={this.props.sendTheAlert}>Click</button>
      </div>
    );
  }
}

function ThemedApp(){
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  )
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


export default connect(mapStateToProps, mapDispatchToProps)(ThemedApp);
