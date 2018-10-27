import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizContainer from './components/quiz';
import App from './components/testapp';

function Root(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={QuizContainer} />
                <Route path="/test-app" component={App} />
            </Switch>
        </Router>
    )
}

export default Root;
