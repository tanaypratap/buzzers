import React from 'react'
import { firebaseAuth } from '../../firebase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Logout extends React.Component {
  componentDidMount() {
    this.logout()
  }

  /**
   * To logout from Google use this function
   */
  logout = () => {
    firebaseAuth().signOut();
    localStorage.removeItem('user')
  };
  render() {
    return (
      <div className="container">
        <div className="row" style={{ padding: '10px', paddingTop: '30%' }}>
          <Grid item xs={12}>
            <Paper style={{ textAlign: 'center', padding: '20px' }}>
              <Typography gutterBottom variant="h5" component="h3">
                You have been logged out. You can close the window.
              </Typography>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Logout
