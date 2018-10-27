/**
 * @description View code
 * @author Akanksha Choudhary <akanksha.ch29@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class QuizLayout extends React.Component {
    componentDidMount() {
        console.log('This needs to be removed');
    }
    render() {
        return (
          <Button variant="contained" color="primary" style={styles.button}>
            Test Button
          </Button>
        )
    }
}

QuizLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(QuizLayout)
