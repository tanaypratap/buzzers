import React from 'react'
import Typography from '@material-ui/core/Typography';


class QuizScore extends React.Component {
    render() {
        return (
          <div className="container">
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <div>
                <Typography gutterBottom variant="h5" component="h2" className="text-center">
                  Number of Questions you answered:
                  <br /> {this.props.numberofQuestionsAnswered}
                </Typography>
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
