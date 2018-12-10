import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AnswerWaitTimer from './AnswerWaitTimer'

class AnswerWaitTimerContainer extends Component {
    constructor(props) {
        super(props);
        this.timerId = 0;
        this.state = {
            remUsers: 0,
            waitTime: 5,
            status: "",
            correctAnswer: ""
        }
    }

    componentDidMount() {
        // Get data from local Storage like remaining user,
        // correct answer and status
        const remUsers = localStorage.getItem('remUsers') || 0;
        const status = localStorage.getItem('status');
        const correctAnswer = localStorage.getItem('answer');

        // Set state
        this.setState({
            remUsers,
            status,
            correctAnswer
        });

        // Wait for 5 seconds and reroute back
        this.timerId =
            setTimeout(() => {
                const id = localStorage.getItem('qId');
                this.props.history.replace(`/quiz/${id}`);
            }, 5000)

        // Acts like a clock of 5 seconds counting down
        this.runningTimer = setInterval(() => {
            this.setState({ waitTime: this.state.waitTime - 1 })
        }, 1000)

    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
        clearInterval(this.runningTimer);
    }

    render() {
        return (
            <div>
                <AnswerWaitTimer
                    waitTime={this.state.waitTime}
                    remainingUsers={this.state.remUsers}
                    correctAnswer={this.state.correctAnswer}
                    status={this.state.status} />
            </div>
        )
    }

}

export default withRouter(AnswerWaitTimerContainer);
