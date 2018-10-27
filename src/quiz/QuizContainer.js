/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */

import React from 'react';
import QuizLayout from './QuizLayout';

class QuizContainer extends React.Component {
    componentDidMount() {
        console.log('Needs to be removed')
    }

    render() {
        return <QuizLayout quizNumber={23} />
    }
}

export default QuizContainer