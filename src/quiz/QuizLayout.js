/**
 * @description View code
 * @author Akanksha Choudhary <akanksha.ch29@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 200,
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class QuizLayout extends React.Component {
    componentDidMount() {
        console.log('This needs to be removed');
    }
    render() {
      const { classes } = this.props;
        return (
          <div className="container text-center">
            <div className="row text-center">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    style={styles.media}
                    image="/images/gk_thumbnail.jpg"
                    title="Competitive"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      General Knowledge
                    </Typography>
                    <Typography component="p">
                      Test your general knowledge
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" color="primary" style={styles.button}>
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        )
    }
}

QuizLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(QuizLayout)
