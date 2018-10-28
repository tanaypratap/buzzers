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


const styles = theme => ({
    card: {
        minWidth: '95%',
        maxWidth: '95%'
    },
    media: {
        height: 140,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: 'rgb(59, 20, 82)',
    }
});

const DemoQuiz = ({ classes, startDemoQuiz }) => (
  <div className="container">
    <div className="row" style={{ paddingTop: "5vh" }}>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Start Your Own Quiz
              </Typography>
              <Typography component="p">
                Once you click on start, this will begin a new quiz in 30
                seconds
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ float: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={startDemoQuiz}
            >
              Host Quiz
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  </div>
);

DemoQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DemoQuiz)
