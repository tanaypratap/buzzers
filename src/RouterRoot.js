import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import QuizContainer from './quiz';

function Root(){
    return(
        <Router>
            <Route exact path="/" component={QuizContainer} />
        </Router>
    )
}

export default Root;
