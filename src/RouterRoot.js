/**
 * @description Router root for frontend routing
 * @author Tanay Pratap <tanay.mit@gmail.com>
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizListContainer from './components/quiz-list/QuizListContainer';
import PlayArenaContainer from './components/play-arena/PlayArenaContainer';
import QuizStartTimerContainer from './components/quiz-start-timer/QuizStartTimerContainer';
import QuizScoreContainer from './components/quiz-scores/QuizScoreContainer';
import Login from './components/login/Login';
import Logout from "./components/logout/Logout";
import NotFound from "./components/not-found/NotFound";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Navbar from "./components/navbar/Navbar";

import { firebaseAuth } from './firebase';
import AnswerWaitTimerContainer from './components/answer-wait-timer/AnswerWaitTimerContainer';

export const QuizContext = React.createContext();

export class QuizContextProvider extends React.Component{
    render(){
        return(
            <QuizContext.Provider value={{
                state: this.state,
                setQuiz: (quizId) => {
                    this.setState({ quizId })
                }
            }}>
                {this.props.children}
            </QuizContext.Provider>
        )
    }
}

class ProtectedRoutes extends React.Component {
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/login')
      } else {
        const { displayName, photoURL, uid, email } = user
        localStorage.setItem('user', JSON.stringify({ displayName, photoURL, uid, email }))
      }
    })
  }
  render() {
    return <Router>
        <Switch>
          <Route exact path="/" component={QuizListContainer} />
          <Route path="/quiz/:quizId" component={PlayArenaContainer} />
          <Route exact path="/wait-for-quiz-start/:quizId" component={QuizStartTimerContainer} />
          <Route path="/scores" component={QuizScoreContainer} />
          <Route path="/answer-wait-time" component={AnswerWaitTimerContainer} />
          <Route component={NotFound} />
        </Switch>
      </Router>;
  }

}

ProtectedRoutes = withRouter(ProtectedRoutes)

function Root(){
    return(
        <Router>
            <QuizContextProvider>
            <div>
            <Navbar />
              <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <ProtectedRoutes />
              </Switch>
            </div>
            </QuizContextProvider>
        </Router>
    )
}


export default Root;
