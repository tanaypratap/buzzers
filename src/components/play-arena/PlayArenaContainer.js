import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from "./../../firebase-utils/firebase-client";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import './PlayArena.css'

// [TODO] This file has to broken into PlayArena and PlayArenaContainer
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

class PlayArenaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: null,
            hasAnswered: false,
            canAnswer: true,
            userOut: false,
            waitTime: 10,
            currentQuestionId: 1
        }
        this.timerId = 0;     
        this.isUserOut = false;   
    }

    componentDidMount() {
        const that = this;
        // Get Data from Local Storage
        const user = JSON.parse(localStorage.getItem('user'));
        const { quizId } = this.props.match.params;
        const currentQuestionId = parseInt(localStorage.getItem('id')) || 1;
        
        // Check if User is alive in the game
        that.checkIfUserAlive(quizId, user)
        .then( (val) => {
            if(!val){
                that.isUserOut = true;
            }
            // Get the Question from Firebase
            that.getQuestion(quizId, currentQuestionId)
            .then( (question) => {
                console.log(that.state);
                // Setting State to re-render view
                that.setState({
                    question: question,
                    userOut: that.isUserOut,
                    currentQuestionId: currentQuestionId
                })

                return question;
            })
            .then( (question) => {
                // Clock
                that.runningTimer = setInterval( () => {
                    that.setState({ waitTime: that.state.waitTime - 1})
                }, 1000);

                // Setting game play timer for 10 seconds. 
                that.timerId =  setTimeout( () => {
                    console.log(that.state);
                    // This is how we rule out a person if he doesn't answer
                    if(!that.state.hasAnswered){
                        firebase.userTournamentQuizResponse(quizId, currentQuestionId, user, null)
                    }
                    
                    // Get Remaining Users in the Game
                    that.getRemainingUsers(quizId, currentQuestionId, question)
                    .then( (val) => {
                        if(val === null) val = 0;
                        localStorage.setItem('remUsers', val);
                        const nextId = currentQuestionId+1;
                        localStorage.setItem('id', nextId);
                        localStorage.setItem('answer', question.correctAnswer);
                        console.log(that.state.hasAnswered, ' A');
                        console.log(that.state.userOut, ' B');
                        if (!that.state.hasAnswered && !that.state.userOut) {
                            localStorage.setItem('status', 'No answer received. You are out of the game');
                        }
                        else if (that.state.hasAnswered && that.state.userOut) {
                            localStorage.setItem('status', 'Incorrect answer. You are out');
                        }
                        else if (that.state.hasAnswered && !that.state.userOut) {
                            localStorage.setItem('status', 'Correct answer. Next question coming up');
                        }
                        else {
                            localStorage.setItem('status', 'You are already out of the game');
                        }
                        that.props.history.push(`/answer-wait-time`);
                    })
                }, 10000);
            })
        });    

        // Check if the game must end
        that.getQuiz(quizId)
        .then( (quiz) => {
            if(currentQuestionId === quiz.questionCount + 1){
                that.props.history.push('/scores');
            }
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
        clearTimeout(this.runningTimer);
    }

    checkIfUserAlive = (quizId, user ) => {
        return new Promise( (resolve, reject) => {
            firebase.checkIfUserAlive(quizId, user, (val) => {
                console.log('Aa gya ', val);
                resolve(val);
            })
        })
    }

    getQuiz = (quizId) => {
        return new Promise( (resolve, reject) => {
            firebase.getQuiz(quizId, (val) => {
                resolve(val);
            })
        })
    }

    getRemainingUsers = (quizId, currentQuestionId, currentQuestion) => {
        return new Promise( (resolve, reject) => {
            firebase.getUsersRemainingInGame(quizId, currentQuestionId, currentQuestion.correctAnswer, (val) => {
                resolve(val);
            })
        })
    }

    getQuestion = (quizId, currentQuestionId) => {
        return new Promise( (resolve, reject) => {
            firebase.getQuizQuestion(quizId, currentQuestionId, (val) => {
                resolve(val);
            })
        })
    }

    handleClick(event, answer) {
        event.preventDefault();
        // Handles user answers
        console.log('From HandleClick', this.state.question.correctAnswer);
        const user = JSON.parse(localStorage.getItem('user'));
        if (answer !== this.state.question.correctAnswer) {
            this.setState({
                userOut: true
            })
        }
        const { quizId } = this.props.match.params;
        this.setState({
            canAnswer: false,
            hasAnswered: true
        })
        // Invoke firebase function to submit answer for the user
        console.log(this.state.currentQuestionId);
        firebase.userTournamentQuizResponse(quizId, this.state.currentQuestionId, user, answer);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="container" style={{ backgroundColor: '#2f0338', minHeight: '100vh' }}>
                <div>
                    <div className="row" style={{ paddingTop: '3vh' }}>
                        {this.state.question &&
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Typography gutterBottom variant="h5" component="h4" style={{ color: 'white' }}>
                                    Remaining Time: {this.state.waitTime}s
                        </Typography>
                                <br />
                                <div style={{ minHeight: '100px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '15px' }}>
                                    <Typography gutterBottom variant="h5" component="h1" style={{ color: 'white', alignItems: 'center' }}>
                                        {this.state.question.questionText}
                                    </Typography>
                                </div>
                                <br />
                                <Button id="#btn" variant="outlined" className={classes.button} type="button"
                                    onClick={(event) => this.handleClick(event, this.state.question.option1)}
                                    disabled={!this.state.canAnswer || this.state.userOut}>
                                    {this.state.question.option1}
                                </Button>
                                <br />
                                <Button id="#btn" variant="outlined" className={classes.button} type="button"
                                    onClick={(event) => this.handleClick(event, this.state.question.option2)}
                                    disabled={!this.state.canAnswer || this.state.userOut}>
                                    {this.state.question.option2}
                                </Button>
                                <br />
                                <Button id="#btn" variant="outlined" className={classes.button} type="button"
                                    onClick={(event) => this.handleClick(event, this.state.question.option3)}
                                    disabled={!this.state.canAnswer || this.state.userOut}>
                                    {this.state.question.option3}
                                </Button>
                                <br />
                                <Button id="#btn" variant="outlined" className={classes.button} type="button"
                                    onClick={(event) => this.handleClick(event, this.state.question.option4)}
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
