/**
 * @description Container code will be written by Shashank
 * @author Shashank Jha
 */
import React from 'react';
import QuizLayout from './QuizLayout';
import { getAllQuiz } from './utils/dbUtils';

class QuizContainer extends React.Component {
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
                <QuizLayout quizNumber={23} />
            </div>
        )
    }
}

export default QuizContainer
