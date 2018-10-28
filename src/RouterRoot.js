/**
 * @description Router root for frontend routing
 * @author Tanay Pratap <tanay.mit@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizListContainer from './components/quiz-list/QuizListContainer';
import App from './components/testapp';
import PlayArenaContainer from './components/play-arena/PlayArenaContainer';
import QuizStartTimerContainer from './components/quiz-start-timer/QuizStartTimerContainer'
import QuizScoreContainer from './components/quiz-scores/QuizScoreContainer'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AnswerWaitTimerContainer from './components/answer-wait-timer/AnswerWaitTimerContainer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Root(props){
  const { classes } = props;
    return(
        <Router>
            <div>
              <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#3b1452' }}>
                  <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                      <img src="/images/buzzers.png" alt="buzzers logo" style={{ borderRadius: '55%' }}/>
                    </IconButton>
                    <Typography variant="h5" color="inherit" className={classes.grow}>
                      Buzzers
                    </Typography>
                  </Toolbar>
                </AppBar>
              </div>

              <Switch>
                  <Route exact path="/" component={QuizListContainer} />
                  <Route path="/test-app" component={App} />
                  <Route path="/quiz/:quizId" component={PlayArenaContainer} />
                  <Route exact path="/wait-for-quiz-start/:quizId" component={QuizStartTimerContainer} />
                  <Route path="/scores" component={QuizScoreContainer} />
                  <Route path="/answer-wait-time" component={AnswerWaitTimerContainer} />
              </Switch>
            </div>
        </Router>
    )
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);
