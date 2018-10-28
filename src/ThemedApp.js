/**
 * @author Shashank
 * @description  This is the App Container
 */
import React from 'react';
import Root from './RouterRoot';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utils/material-ui-theme'


function ThemedApp(){
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  )
}
export default ThemedApp
