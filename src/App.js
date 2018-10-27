import React, { Component } from 'react';
import './App.css';
import Quiz from './quiz';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utils/material-ui-theme'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Start putting your code here </h1>
        <Quiz></Quiz>
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

export default ThemedApp;
