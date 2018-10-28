import React from 'react'


class QuizScore extends React.Component {
    render() {
        return (
            <div>
                You answered {this.props.numberofQuestionsAnswered} 
            </div>
            <div>
                Winners List 
                {
                    this.props.winnersList.map(eachWinner => {
                        <div> eachWinner.name </div>
                    })
                }
            </div>
        )
    }
}

export default QuizScore