import React from 'react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const NotFound = () => (
  <div className="container">
    <div className="row" style={{ padding: '20px', paddingTop: '10%' }}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h4" style={{ color: '#000000' }}>
          {'It looks like you\'re lost somewhere. Try going home?'}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => this.props.history.push("/")}>Go Home</Button>
      </Grid>
    </div>
  </div>
)

export default  withRouter(NotFound)
