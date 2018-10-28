import React from 'react'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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
  primary: {
    fontSize: '18px'
  }
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
                    <span style={{ fontSize: '70px', color: '#2196f3' }}>{this.props.numberofQuestionsAnswered}</span>
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
                      this.props.winnersList.map(eachWinner =>
                      <List key={eachWinner}>
                        <ListItem>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                          <ListItemText primary={eachWinner} className={classes.primary}/>
                        </ListItem>
                      </List>
                      )
                    }
                  </div>
                </Paper>
              </Grid>
            </div>
          </div>
        )
    }
}

QuizScore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuizScore);
