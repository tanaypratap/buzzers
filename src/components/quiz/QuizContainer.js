/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizLayout from './QuizLayout';
import { getAllQuiz, getQuizInfo } from '../../firebase-utils/firebase-client';

class QuizContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            upcomingQuizes: {}
        };
    }

    componentDidMount() {
        getAllQuiz( (value) => {
            const currentTime = Date.now();
            let upcomingQuizes = {};
            if(value){
                Object.keys(value).map( (id) => {
                    if(value[id].Start_time > currentTime){                            
                       upcomingQuizes[id] = value[id]
                    }
                })
                this.setState({
                    upcomingQuizes
                })
            }
        });
        
    }

    render() {
        const quizes = this.state.upcomingQuizes;
        return (
            <div>
                 {quizes && Object.keys(quizes)
                    .map(id => <QuizLayout quizName={quizes[id].quiz_name} />)} 
            </div>
        )
    }
}

export default QuizContainer
