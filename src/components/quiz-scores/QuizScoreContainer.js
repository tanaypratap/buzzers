/**
 * @description Container code for Scores page
 * @author
 */
import React from 'react';
import QuizScore from './QuizScore';
import { withRouter } from "react-router-dom";


class QuizScoreContainer extends React.Component {

    render() {
        return (
            <div>
                <QuizScore numberofQuestionsAnswered = {5} winnersList = {['a', 'b']} />
            </div>
        )
    }
}

export default withRouter(QuizScoreContainer);
