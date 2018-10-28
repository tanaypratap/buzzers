import React from 'react'
import QuizStartTimer from './QuizStartTimer'
import moment from 'moment';
import { getQuiz } from './../../firebase-utils/firebase-client';
import { withRouter } from "react-router-dom";

class QuizStartTimerContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            remainingTime: null
        }
        this.timerId = 0;
    }

    componentDidMount(){
        const { quizId } = this.props.match.params;
        getQuiz(quizId, (val) => {
            const remainingTime = moment(val.Start_time).fromNow();
            const remainingTimeInMilliSeconds = val.Start_time - Date.now();
            console.log(remainingTimeInMilliSeconds);
            console.log(remainingTime);
            this.setState({
                remainingTime
            }, () => {
                this.timerId = setTimeout( () => { console.log('Khulega'); this.props.history.replace(`/quiz/${quizId}`) }, remainingTimeInMilliSeconds)
            });
        });
    }

    componentWillUnmount(){
        console.log('Unmounting');
        clearTimeout(this.timerId);
    }

    render() {
        return <QuizStartTimer startTime={this.state.remainingTime} />
    }
}

export default withRouter(QuizStartTimerContainer);