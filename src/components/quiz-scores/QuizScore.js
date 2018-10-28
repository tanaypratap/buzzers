import React from 'react'


class QuizScore extends React.Component {
    render() {
        return (
          <div className="container">
            <div className="row" style={{ paddingTop: '5vh' }}>
              <div>
                  You answered {this.props.numberofQuestionsAnswered}
              </div>
              <div>
                  Winners List
                  {
                      this.props.winnersList.map(eachWinner =>
                          <div> { eachWinner } </div>
                      )
                  }
              </div>
            </div>
          </div>
        )
    }
}

export default QuizScore
