/**
 * @description View code
 * @author Akanksha Choudhary <akanksha.ch29@gmail.com>
 */
import React from 'react';
import './Quiz.css'

class QuizLayout extends React.Component {
    componentDidMount() {
        console.log('This needs to be removed');
    }
    render() {
        return <h1 className="quiz-number-header"> Quiz no. {this.props.quizNumber} </h1>
    }
}

export default QuizLayout