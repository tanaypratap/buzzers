/**
 * @author Shashank
 * @description  The entry point js file 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThemedApp from './ThemedApp';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

// This method invokes the createstore method passing
// reducer and initial state
const store = configureStore();

ReactDOM.render(
<Provider store={store}>
    <ThemedApp />
</Provider>, 
document.getElementById('root'));


serviceWorker.register();
