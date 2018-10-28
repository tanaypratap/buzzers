import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getQuizQuestion, userTournamentQuizResponse, getQuiz } from "./../../firebase-utils/firebase-client";   
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: '20px',
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20px',
  }
});

class PlayArenaContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuestion: 1,
            question: null,
            canAnswer: true,
            message: "",
            gameOver: false,
            totalQuestions: 6
        }
        this.timerId = 0;
    }

    componentDidMount(){
        const currentQuestion = parseInt(localStorage.getItem('id')) || 1;
        if(currentQuestion === this.state.totalQuestions){
            localStorage.clear();
            this.props.history.push('/score');
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
        this.timerId = 
            setTimeout( () => {
                console.log('Bhej rhe');
                const nextQuestion = this.state.currentQuestion+1;
                console.log('Next Question: ', nextQuestion);
                localStorage.setItem('id', nextQuestion);
                this.props.history.push(`/answer-wait-time`);    
            }, 10000);
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
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
                setTimeout( () => {
                    this.setState({
                        question,
                        canAnswer: true,
                        message: ""
                    });
                    resolve();
                }, 3000)
            });
        });

    }

    handleClick(event, answer){
        event.preventDefault();
        let message= "";
        (answer === this.state.question.correctAnswer)?
            message="Correct":
            message="Incorrect";
        const { quizId } = this.props.match.params;
        userTournamentQuizResponse(quizId, this.state.currentQuestion, 'shashank', answer);
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
              { !this.state.gameOver ?
              <div className="row" style={{ paddingTop: '5vh' }}>
                {
                  !this.state.canAnswer &&
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: '#ffffff' }}>
                        Remaining Time for next question: 5
                      </Typography>
                    </div>
                }
                {this.state.question ?
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '15px' }}>
                          <Typography gutterBottom variant="h5" component="h1" style={{ color: 'white' }}>
                            Question: {this.state.question.questionText}
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
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '20px', paddingTop: '40vh' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h3" component="h2" style={{ color: '#ffffff' }}>
                          Time for Quiz to start: 5
                        </Typography>
                      </div>
                    </div>
                }
                {!this.state.canAnswer &&
                    <h4>{this.state.message}</h4>
                }
              </div>:
                <div>
                    <h2>Game Over</h2>
                </div>
                }
                </div>
              
            </div>
            
        )
    }
}

PlayArenaContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PlayArenaContainer));
