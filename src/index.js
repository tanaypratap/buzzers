/**
 * @author Shashank
 * @description  The entry point js file 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThemedApp from './ThemedApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ThemedApp />,
document.getElementById('root'));

// This registers a service worker
serviceWorker.register();
