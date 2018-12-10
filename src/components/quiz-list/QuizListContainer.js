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
    constructor(props) {
        super(props);
        this.state = {
            upcomingQuizes: [],
            upcomingQuizesObject: {},
            showHostYourOwnQuiz: true
        };
    }

    componentDidMount() {
        // Removing already present quiz in Local Storage
        localStorage.removeItem('id');

        // Get all quizes from firebase function 
        getAllQuiz((value) => {
            const currentTime = Date.now();
            let upcomingQuizesObject = {};

            // Value has object of all quizes
            if (value) {
                // Select only upcoming quizes
                Object.keys(value).map((id) => {
                    if (value[id].Start_time > currentTime) {
                        upcomingQuizesObject[id] = value[id]
                    }
                })
                // Converting object to array to enable sorting and keeping access to quizId 
                // quizId was existing as key in upcomingQuizesObject
                let result = Object.keys(upcomingQuizesObject).map(function (key) {
                    let obj = upcomingQuizesObject[key];
                    obj['id'] = key;
                    return obj;
                });
                // Sorting the quizes using lodash
                result = _.orderBy(result, ['Start_time'], ['asc']);
                // Setting state to enable re-render
                this.setState({
                    upcomingQuizes: result,
                    upcomingQuizesObject: upcomingQuizesObject
                })
            }
        });
    }

    // This function reroutes to waiting page if a quiz still is accessible
    handleStartQuiz(event, id) {
        event.preventDefault();
        // Check condition
        if (this.state.upcomingQuizesObject[id].Start_time < Date.now()) {
            window.location.reload();
            return;
        }
        // Get user from Local Storage
        const user = JSON.parse(localStorage.getItem('user'));
        // Add user to the chosen quiz in firebase 
        addUserToTournamentQuiz(id, user);
        // re-route to the waiting page of that quiz
        this.props.history.push(`/wait-for-quiz-start/${id}`)
    }

    handleClick = () => {
        // Get user from Local Storage
        const user = JSON.parse(localStorage.getItem('user'));
        // Set state to diable creating a new quiz
        this.setState({ showHostYourOwnQuiz: false })
        // Invoke firebase function to create a new quiz
        createDemoQuiz(user.displayName);
    }

    render() {
        const quizes = this.state.upcomingQuizes;
        return (
            <div>
                {
                    /* Component with a button to start a demo quiz */
                    this.state.showHostYourOwnQuiz &&
                    <DemoQuiz
                        startDemoQuiz={this.handleClick}
                    />
                }

                {
                    /* Components for upcoming quiz with a button to enter */
                    quizes && quizes
                        .map(quiz => <QuizList key={quiz.id}
                            quizName={quiz.quiz_name}
                            startTime={quiz.Start_time}
                            enterQuiz={(event) => { this.handleStartQuiz(event, quiz.id) }}
                            remainingTime={quiz.Start_time - Date.now()} />)
                }
            </div>
        )
    }
}

// withRouter enables history as a part of props
export default withRouter(QuizListContainer);
