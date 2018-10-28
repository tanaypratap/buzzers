/**
 * @description The page shows a particular quiz
 * @author Akanksha Choudhary <akanksha.ch29@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';


const styles = theme => ({
  card: {
    minWidth: '95%',
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'rgb(59, 20, 82)',
  }
});

class QuizList extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        button: false
      }
    }
    
    componentDidMount() {
        console.log(this.props.remainingTime);
        if(this.props.remainingTime < 900000){
          this.setState({
            button: true
          })
        }
    }

    render() {
      const { classes } = this.props;
      console.log(this.props.classes);
        return (
          <div className="container">
            <div className="row" style={{ paddingTop: '5vh' }}>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {this.props.quizName}
                      </Typography>
                      <Typography component="p">
                        Starts {moment(this.props.startTime).fromNow()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ float: 'right' }}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.props.enterQuiz}
                        disabled={!this.state.button}>
                      Start Quiz
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        )
    }
}

QuizList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(QuizList)
