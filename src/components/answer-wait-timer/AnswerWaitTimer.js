import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


class AnswerWaitTimer extends React.Component {
    render() {
        return (
          <div className="container">
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <p style={{ color: 'black' }}>{this.props.waitTime}</p>
              <p style={{ color: 'black' }}>Users going ahead: {this.props.remainingUsers}</p>
            </div>
          </div>

        )
      }
}

export default AnswerWaitTimer
