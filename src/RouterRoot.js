/**
 * @description Router root for frontend routing
 * @author Tanay Pratap <tanay.mit@gmail.com>
 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizContainer from './components/quiz';
import QuizQuestionContainer from './quiz-question';
import App from './components/testapp';
import PlayArena from './components/quiz/containers/PlayArena';

function Root(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={QuizContainer} />
                <Route path="/test-app" component={App} />
                <Route path="/quiz/:quizId" component={PlayArena} />
                <Route exact path="/questions" component={QuizQuestionContainer} />
            </Switch>
        </Router>
    )
}

export default Root;
