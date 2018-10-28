import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { history, classes } = this.props
    return(
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#3b1452' }}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.props.history.push('/')}>
              <img src="/images/buzzers.png" alt="buzzers logo" style={{ borderRadius: '55%' }}/>
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Buzzers
            </Typography>
            <div>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.props.history.push(`/logout`)}>Logout</MenuItem>
            </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}
}
Navbar =  withStyles(styles)(Navbar)

export default withRouter(Navbar)
