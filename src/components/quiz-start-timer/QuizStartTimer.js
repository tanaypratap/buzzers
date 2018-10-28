import React from 'react'


class QuizStartTimer extends React.Component {
    render() {
        return (
            <div>
                Starts in {this.props.startTime} hours.
            </div>
        )
    }
}

export default QuizStartTimer