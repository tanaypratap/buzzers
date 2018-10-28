/**
 * @description Container code for Scores page
 * @author
 */
import React from 'react';
import QuizScore from './QuizScore';
import { withRouter } from "react-router-dom";
import { getFinalUserScore, getWinnersForTournamentQuiz } from '../../firebase-utils/firebase-client';

class QuizScoreContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finalScore: 0,
            winners: []
        }
    }
    componentDidMount() {
        const quizId = localStorage.getItem('qId');
        const user = JSON.parse(localStorage.getItem('user'));
        getFinalUserScore(quizId, user, (val) => {
            this.setState({
                finalScore: val
            })
        })
        getWinnersForTournamentQuiz(quizId, (val) => {
            this.setState({
                winners: val
            })
        })
    }
    render() {
        return (
            <div>
                <QuizScore numberofQuestionsAnswered = {this.state.finalScore} winnersList = {this.state.winners} />
            </div>
        )
    }
}

export default withRouter(QuizScoreContainer);
