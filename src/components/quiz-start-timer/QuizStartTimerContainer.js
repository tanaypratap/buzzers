import React from 'react'
import QuizStartTimer from './QuizStartTimer'
import moment from 'moment';
import { getQuiz } from './../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";

class QuizStartTimerContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            remainingTime: null,
            usersJoined: 0
        }
        this.timerId = 0;
    }

    componentDidMount(){
        const { quizId } = this.props.match.params;
        getQuiz(quizId, (val) => {
            const remainingTime = moment(val.Start_time).fromNow();
            const remainingTimeInMilliSeconds = val.Start_time - Date.now();
            this.setState({
                remainingTime: remainingTime,
                usersJoined: val.userCount
            }, () => {
                this.timerId = setTimeout( () => { this.props.history.replace(`/quiz/${quizId}`) }, remainingTimeInMilliSeconds)
            });
        });
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
    }

    render() {
        return <QuizStartTimer startTime={this.state.remainingTime} usersJoined={this.state.usersJoined}/>
    }
}

export default withRouter(QuizStartTimerContainer);
