/**
 * @description Router root for frontend routing
 * @author Tanay Pratap <tanay.mit@gmail.com>
 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizListContainer from './components/quiz-list/QuizListContainer';
import App from './components/testapp';
import PlayArenaContainer from './components/play-arena/PlayArenaContainer';
import QuizStartTimerContainer from './components/quiz-start-timer/QuizStartTimerContainer'

function Root(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={QuizListContainer} />
                <Route path="/test-app" component={App} />
                <Route path="/quiz/:quizId" component={PlayArenaContainer} />
                <Route exact path="/wait-for-quiz-start" component={QuizStartTimerContainer} />
            </Switch>
        </Router>
    )
}

export default Root;
