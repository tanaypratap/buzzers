/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizList from './QuizList';
import { getAllQuiz } from '../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";


class QuizListContainer extends React.Component {
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
                Object.keys(value).map((id) => {
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

    handleStartQuiz(event, id){
        event.preventDefault();
        console.log('Here is ', id);
        this.props.history.push(`/quiz/${id}`)
    }

    render() {
        const quizes = this.state.upcomingQuizes;
        return (
            <div>
                 {quizes && Object.keys(quizes)
                    .map(id => <QuizList key={id} quizName={quizes[id].quiz_name} startTime={quizes[id].Start_time} enterQuiz={(event) => {this.handleStartQuiz(event, id)}} />)}
            </div>
        )
    }
}

export default withRouter(QuizListContainer);