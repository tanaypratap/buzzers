import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getQuizQuestion, userTournamentQuizResponse, checkIfUserAlive, getUsersRemainingInGame, getQuiz } from "./../../firebase-utils/firebase-client";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
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
    border: '1px solid rgb(255, 255, 255)',
    '&:hover': {
      backgroundColor: '#8d01ad',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#8d01ad',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
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
            hasAnswered: false,
            message: "",
            gameOver: false,
            totalQuestions: 100,
            userOut: false,
            waitTime: 10
        }
        this.timerId = 0;
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'));
        const { quizId } = this.props.match.params

        let promise = new Promise( (resolve, reject) => {
            this.setState({
                hasAnswered: false
            });

            getQuiz( quizId, (val) => {
                console.log('TQ: ', val);
                this.setState({
                    totalQuestions: val.questionCount
                })
            })

            checkIfUserAlive( quizId, user, (val) => {
                console.log('Here');
                if(!val){
                    console.log('Nhi hai zinda');
                    this.setState({
                        userOut: true,
                        canAnswer: false
                    }, () => { resolve();})
                }
                else{
                    resolve();
                }
            })
        });

        promise.then( () => {
            const currentQuestion = parseInt(localStorage.getItem('id')) || 1;

            let gettingQuesPromise = new Promise( (resolve, reject) => {
                if(currentQuestion === this.state.totalQuestions){
                    this.props.history.push('/scores');
                    return;
                }
                if(currentQuestion === 1){
                    this.getQuestion();
                    localStorage.setItem('qId', this.props.match.params.quizId);
                }
                else{
                    this.setState({
                        currentQuestion
                    }, () => {this.getQuestion()})
                }
                resolve();
            });

            gettingQuesPromise.then( () => {
                this.runningTimer = setInterval(() => {
                    this.setState({ waitTime: this.state.waitTime - 1})
                }, 1000);


                this.timerId =
                setTimeout( () => {
                    if(!this.state.hasAnswered){
                        userTournamentQuizResponse(quizId, this.state.currentQuestion, user.uid, null)
                    }

                    let getRemainingUsersPromise = new Promise( (resolve, reject) => {
                        getUsersRemainingInGame(quizId, this.state.currentQuestion, this.state.question.correctAnswer, (val) =>{
                            localStorage.setItem('remUsers', val);
                            resolve();
                        })
                    })

                    getRemainingUsersPromise.then( () => {
                        console.log('Bhej rhe');
                        const nextQuestion = this.state.currentQuestion+1;
                        console.log('Next Question: ', nextQuestion);
                        localStorage.setItem('id', nextQuestion);
                        this.props.history.push(`/answer-wait-time`);
                    })

                }, 10000);

                })
        });
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
        clearTimeout(this.runningTimer);
    }

    getQuestion(){

        let question;
        let firebasePromise = new Promise( (resolve, reject) => {
            const { quizId } = this.props.match.params;
            const questionId = this.state.currentQuestion;
            console.log(questionId);
            getQuizQuestion(quizId, questionId, (ques) => {
                console.log(ques);
                question = ques;
                resolve();
            });
        });

        let questionPromise = new Promise( (resolve, reject) => {
            firebasePromise.then( (val) => {
                
                this.setState({
                    question,
                    canAnswer: true,
                    message: ""
                }, () => {resolve();});
                
     
            });
        });

    }

    handleClick(event, answer){
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            hasAnswered: true
        })
        let message= "";
        (answer === this.state.question.correctAnswer)?
            message="Correct":
            message="Incorrect";
        const { quizId } = this.props.match.params;
        userTournamentQuizResponse(quizId, this.state.currentQuestion, user, answer);
        if(message === "Incorrect"){
            this.setState({
                gameOver: true
            })
        }
        else{
            this.setState({
                canAnswer: false,
                message,
            });
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="container" style={{ backgroundColor: '#2f0338', minHeight: '100vh' }}>
              <div>
              <div className="row" style={{ paddingTop: '5vh' }}>
                {this.state.question &&
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <p style={{ color: 'white' }}>{this.state.waitTime}</p>
                        <div style={{ minHeight: '100px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '15px'  }}>
                          <Typography gutterBottom variant="h5" component="h1" style={{ color: 'white' }}>
                            {this.state.question.questionText}
                          </Typography>
                        </div>
                        <Button id="#btn" variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option1)}
                            disabled={!this.state.canAnswer || this.state.userOut}>
                            {this.state.question.option1}
                        </Button>
                        <br /><br />
                        <Button id="#btn" variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option2)}
                            disabled={!this.state.canAnswer || this.state.userOut}>
                            {this.state.question.option2}
                        </Button>
                        <br /><br />
                        <Button id="#btn" variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option3)}
                            disabled={!this.state.canAnswer || this.state.userOut}>
                            {this.state.question.option3}
                        </Button>
                        <br /><br />
                        <Button id="#btn" variant="outlined" className={classes.button} type="button"
                            onClick={ (event) => this.handleClick(event, this.state.question.option4)}
                            disabled={!this.state.canAnswer || this.state.userOut}>
                            {this.state.question.option4}
                        </Button>
                    </div>
                }

              </div>

                </div>

            </div>

        )
    }
}

PlayArenaContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PlayArenaContainer));
