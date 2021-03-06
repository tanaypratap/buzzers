import React from 'react'
import QuizStartTimer from './QuizStartTimer'
import moment from 'moment';
import * as firebase from './../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";

class QuizStartTimerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingTime: null,
            usersJoined: 0
        }
        this.timerId = 0;
    }

    componentDidMount() {
        // Takes quiz id from url
        const { quizId } = this.props.match.params;
        localStorage.setItem('qId', quizId);
        // Gets the quiz from firebase and users who have joined
        this.startGame(quizId);
    }

    componentWillUnmount() {
        // Clearing setTimeout
        clearTimeout(this.timerId);
    }

    startGame = (quizId) => {
        this.getQuiz(quizId).then( (val) => {
            // Calculates remaining time
            const remainingTime = moment(val.Start_time).fromNow();
            const remainingTimeInMilliSeconds = val.Start_time - Date.now();
            // Rerouting after time is over
            this.setState({
                remainingTime: remainingTime,
                usersJoined: val.userCount
            }, () => {
                this.timerId = setTimeout(() => { this.props.history.replace(`/quiz/${quizId}`) }, remainingTimeInMilliSeconds)
            });
        });
    }

    getQuiz = (quizId) => {
        return new Promise( (resolve, reject) => {
            firebase.getQuiz(quizId, (val) => {
                resolve(val);
            })
        })
    }

    render() {
        // Quiz Waiting Page
        return <QuizStartTimer startTime={this.state.remainingTime} usersJoined={this.state.usersJoined} />
    }
}

export default withRouter(QuizStartTimerContainer);
