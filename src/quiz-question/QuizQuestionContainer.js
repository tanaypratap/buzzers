/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizQuestion from './QuizQuestionLayout';
import { getAllQuiz } from './utils/dbUtils';

class QuizQuestionContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('Needs to be removed')
        getAllQuiz();
    }

    render() {
        return (
            <div>
                <QuizQuestion quizNumber={23} />
            </div>
        )
    }
}

export default QuizQuestionContainer
