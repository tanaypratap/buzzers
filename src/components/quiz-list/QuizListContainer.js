/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizList from './QuizList';
import { getAllQuiz, addUserToTournamentQuiz, createDemoQuiz } from '../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";
import _ from 'lodash';

class QuizListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            upcomingQuizes: [],
            upcomingQuizesObject: {}
        };
    }

    componentDidMount() {
        getAllQuiz( (value) => {
            const currentTime = Date.now();
            let upcomingQuizesObject = {};
            if(value){
                Object.keys(value).map((id) => {
                    if(value[id].Start_time > currentTime){
                       upcomingQuizesObject[id] = value[id]
                    }
                })
                let result = Object.keys(upcomingQuizesObject).map(function(key) {
                    let obj = upcomingQuizesObject[key];
                    obj['id'] = key;
                    return obj;
                });
                result = _.orderBy(result, ['Start_time'], ['asc']);
                this.setState({
                    upcomingQuizes: result,
                    upcomingQuizesObject: upcomingQuizesObject
                })
            }
        });
    }

    handleStartQuiz(event, id){
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        addUserToTournamentQuiz(id, user);
        this.props.history.push(`/wait-for-quiz-start/${id}`)
    }

    handleClick(){
        const user = localStorage.getItem('user');
        createDemoQuiz(user.displayName);
    }

    render() {
        const quizes = this.state.upcomingQuizes;
        console.log(quizes);
        return (
            <div>
                <button onClick={this.handleClick}>DEMO</button>
                <br />
                 {quizes && quizes
                    .map(quiz => <QuizList key={quiz.id} 
                                    quizName={quiz.quiz_name}
                                    startTime={quiz.Start_time} 
                                    enterQuiz={(event) => {this.handleStartQuiz(event, quiz.id)}}
                                    remainingTime={quiz.Start_time-Date.now()} />)}
            </div>
        )
    }
}

export default withRouter(QuizListContainer);
