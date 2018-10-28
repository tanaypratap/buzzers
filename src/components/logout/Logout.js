import React from 'react'
import { firebaseAuth } from '../../firebase';

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
      <div>
        <h1> You have been logged out now. You can close the window</h1>
      </div>
    );
  }
}

export default Logout