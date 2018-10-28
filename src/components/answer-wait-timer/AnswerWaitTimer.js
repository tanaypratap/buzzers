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
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '15px',
  },
});

class AnswerWaitTimer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
          <div className="container" style={{ backgroundColor: 'rgb(65, 37, 82)', minHeight: '100vh' }}>
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Next question up in
                    <br />
                    <Typography variant="h4" component="h3">
                      {this.props.waitTime}s
                    </Typography>
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
              <br />
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Number of users going ahead in quiz
                    <br />
                    <Typography variant="h4" component="h3" style={{ color: '#2196f3' }}>
                      {this.props.remainingUsers}
                    </Typography>
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
