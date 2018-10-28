import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '15px',
  },
});

class AnswerWaitTimer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
          <div className="container">
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Wait for next question
                    <br />
                    {this.props.waitTime}
                  </Typography>
                </Paper>
              </Grid>
              <br />
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Correct answer was
                    <br />
                    {this.props.correctAnswer}
                  </Typography>
                </Paper>
              </Grid>
              <br />
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    {this.props.status}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Users going ahead in quiz
                    <br />
                    {this.props.remainingUsers}
                  </Typography>
                </Paper>
              </Grid>
              
            </div>
          </div>

        )
      }
}

AnswerWaitTimer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnswerWaitTimer);
