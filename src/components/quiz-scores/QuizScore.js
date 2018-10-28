import React from 'react'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});

class QuizScore extends React.Component {
    render() {
        const { classes } = this.props;
        return (
          <div className="container">
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" component="h5">
                    Number of questions you answered
                    <br />
                    {
                      <span style={{ fontSize: '70px', color: '#2196f3' }}>{this.props.numberofQuestionsAnswered ? this.props.numberofQuestionsAnswered : 0}</span>
                    }
                  </Typography>
                </Paper>
              </Grid>
              <br />
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ backgroundColor: '#efc246' }}>
                      <ListItem>
                        <h2 style={{ color: 'rgb(70, 50, 1)' }}>Winner Board</h2>
                      </ListItem>
                    </Paper>
                  </Grid>

                  <div className={classes.root}>
                    {
                      this.props.winnersList &&
                      Object.keys(this.props.winnersList).map(eachWinner =>
                      <List key={this.props.winnersList[eachWinner]}>
                        <ListItem>
                          <Avatar alt="photo" src={this.props.winnersList[eachWinner].photoURL} />
                          <ListItemText primary={this.props.winnersList[eachWinner].displayName} className={classes.primary}/>
                          <ListItemSecondaryAction>
                            <ListItemText primary={this.props.winnersList[eachWinner].score} className={classes.primary} />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                      )
                    }
                  </div>
                </Paper>
              </Grid>
              <br />
              <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => this.props.history.push('/') }>Play More</Button>
              </Grid>
            </div>
          </div>
        )
    }
}

QuizScore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(QuizScore));
