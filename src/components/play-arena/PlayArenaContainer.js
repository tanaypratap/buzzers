import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getQuizQuestion, userTournamentQuizResponse, getQuiz } from "./../../firebase-utils/firebase-client";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './PlayArena.css'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: '0px',
    padding: '20px',
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20px',
    border: '1px solid rgb(255, 255, 255)'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgb(47, 3, 56)',
  },
});

class PlayArenaContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuestion: 1,
            question: null,
            canAnswer: true,
            message: ""
        }
    }

    componentDidMount(){
        this.getQuestion();
    }

    getQuestion(){

        let question;
        let questionPromise = new Promise( (resolve, reject) => {
            const { quizId } = this.props.match.params;
            const questionId = this.state.currentQuestion;
            console.log(questionId);
            getQuizQuestion(quizId, questionId, (ques) => {
                console.log(ques);
                question = ques;
                resolve();
            });
        });

        questionPromise.then( (val) => {
            setTimeout( () => {
                this.setState({
                    question,
                    canAnswer: true,
                    message: ""
                })
            }, 5000)
        });
    }

    handleClick(event, answer){
        event.preventDefault();
        let message= "";
        let currentQuestion = this.state.currentQuestion;
        (answer === this.state.question.correctAnswer)?
            message="Correct":
            message="Incorrect";
        const { quizId } = this.props.match.params;
        userTournamentQuizResponse(quizId, this.state.currentQuestion, 'shashank', answer);
        this.setState({
            canAnswer: false,
            message,
            currentQuestion: currentQuestion+1,
        }, () => {this.getQuestion()});
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="container" style={{ backgroundColor: '#2f0338', minHeight: '100vh' }}>
              <div className="row" style={{ paddingTop: '3vh' }}>
                {
                  !this.state.canAnswer &&
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: '#ffffff' }}>
                        Remaining Time: 5s
                      </Typography>
                    </div>
                }
                {this.state.question ?
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ minHeight: '100px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center'  }}>
                          <Typography gutterBottom variant="h5" component="h1" style={{ color: 'white' }}>
                            {this.state.question.questionText}
                          </Typography>
                        </div>
                        <Button variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option1)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option1}
                        </Button>
                        <br /><br />
                        <Button variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option2)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option2}
                        </Button>
                        <br /><br />
                        <Button variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option3)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option3}
                        </Button>
                        <br /><br />
                        <Button variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option4)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option4}
                        </Button>
                    </div>:
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '20px', paddingTop: '40%' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Grid item xs={12}>
                          <Paper className={classes.paper}>
                            <Typography gutterBottom variant="h3" component="h2" style={{ color: '#ffffff' }}>
                              Quiz starts in <br /> 5s
                            </Typography>
                          </Paper>
                        </Grid>
                      </div>
                    </div>
                }
                {!this.state.canAnswer &&
                    <h4>{this.state.message}</h4>
                }
              </div>
            </div>
        )
    }
}

PlayArenaContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayArenaContainer)
