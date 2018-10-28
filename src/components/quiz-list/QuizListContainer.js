/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizList from './QuizList';
import { getAllQuiz, addUserToTournamentQuiz, createDemoQuiz } from '../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";
import _ from 'lodash';
import DemoQuiz from './components/DemoQuiz';

class QuizListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            upcomingQuizes: [],
            upcomingQuizesObject: {},
            showHostYourOwnQuiz: true
        };
    }

    componentDidMount() {
        localStorage.removeItem('id');
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

    handleClick = () =>{
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ showHostYourOwnQuiz: false })
        createDemoQuiz(user.displayName);
    }

    render() {
        const quizes = this.state.upcomingQuizes;
        return (
            <div>
                {
                    this.state.showHostYourOwnQuiz &&
                    <DemoQuiz
                        startDemoQuiz={this.handleClick}
                    />
                }
                
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
