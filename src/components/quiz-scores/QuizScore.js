import React from 'react'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Card from '@material-ui/core/Card';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class QuizScore extends React.Component {
    render() {
        const { classes } = this.props;
        return (
          <div className="container">
            <div className="row" style={{ padding: '20px', paddingTop: '5vh' }}>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography gutterBottom variant="h5" component="h2" style={{ justifyContent: 'center', alignItems: 'center' }}>
                  Number of questions you answered:
                  <br /> {this.props.numberofQuestionsAnswered}
                </Typography>
              </div>
              <div className={classes.root}>
              <ListItem>
                <Card style={{ width: '100%', padding: '5px' }}>
                <h2>Winners</h2>
                </Card>
              </ListItem>
              {
                this.props.winnersList.map(eachWinner =>
                <List>
                  <ListItem>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText primary={eachWinner} />
                  </ListItem>
                </List>
                )
              }
              </div>
            </div>
          </div>
        )
    }
}

QuizScore.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuizScore);
