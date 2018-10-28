/**
 * @description The page shows each Question
 * @author Akanksha Choudhary <akanksha.ch29@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import './QuizQuestion.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: '20px',
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  }
});

class QuizQuestion extends React.Component {
    componentDidMount() {
        console.log('This needs to be removed');
    }
    render() {
      const { classes } = this.props;
        return (
          <div className="container" style={{ backgroundColor: '#2f0338' }}>
            <div className="row">
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ height: '200px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', padding: '15px' }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white' }}>
                      What do France, Portugal, Greece and Italy have in common?
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="outlined" className={classes.button} type="button">Option1</Button>
                    <Button variant="outlined" className={classes.button} type="button">Option2</Button>
                    <Button variant="outlined" className={classes.button} type="button">Option3</Button>
                    <Button variant="outlined" className={classes.button} type="button">Option4</Button>
                  </div>
              </div>
            </div>
          </div>
        )
    }
}

QuizQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(QuizQuestion)
