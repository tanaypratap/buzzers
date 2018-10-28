/**
 * @description Container code for Scores page
 * @author
 */
import React from 'react';
import QuizScore from './QuizScore';
import { withRouter } from "react-router-dom";
import { getFinalUserScore } from '../../firebase-utils/firebase-client';

class QuizScoreContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finalScore: 0
        }
    }
    componentDidMount() {
        const quizId = localStorage.getItem('qId');
        console.log(quizId);
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        getFinalUserScore(quizId, user, (val) => {
            console.log(val);
            this.setState({
                finalScore: val
            })
        })
    }
    render() {
        return (
            <div>
                <QuizScore numberofQuestionsAnswered = {this.state.finalScore} winnersList = {['a', 'b']} />
            </div>
        )
    }
}

export default withRouter(QuizScoreContainer);
