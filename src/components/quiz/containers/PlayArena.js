import React, { Component } from 'react';
import { getQuizQuestion } from "../../../firebase-utils/firebase-client";
import Button from '@material-ui/core/Button';

class PlayArena extends Component{
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
            console.log("QuizID: ", quizId);
            const questionId = this.state.currentQuestion;
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
        this.setState({
            canAnswer: false,
            message,
            currentQuestion: currentQuestion+1,
        }, this.getQuestion());
    }

    render(){
        return(
            <div>
                {!this.state.canAnswer && 
                    <h4>Remaining Time for next question: 5</h4>
                }
                {this.state.question ?
                    <div>
                        <h3>Question Statement: {this.state.question.questionText}</h3>
                        <Button variant="contained" color="primary" 
                            onClick={ (event) => this.handleClick(event, this.state.question.option1)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option1}
                        </Button>   
                        <br /><br />
                        <Button variant="contained" color="primary" 
                            onClick={ (event) => this.handleClick(event, this.state.question.option2)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option2}
                        </Button>   
                        <br /><br />
                        <Button variant="contained" color="primary" 
                            onClick={ (event) => this.handleClick(event, this.state.question.option3)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option3}
                        </Button>   
                        <br /><br />
                        <Button variant="contained" color="primary" 
                            onClick={ (event) => this.handleClick(event, this.state.question.option4)}
                            disabled={!this.state.canAnswer}>
                            {this.state.question.option4}
                        </Button>                
                    </div>:
                    <div>
                        <h4>Time for Quiz to start: 5</h4>
                    </div>
                }
                {!this.state.canAnswer && 
                    <h4>{this.state.message}</h4>
                }
            </div>
        )
    }
}

export default PlayArena;
