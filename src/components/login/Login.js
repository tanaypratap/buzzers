import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseAuth, googleProvider } from '../../firebase';
import {createUserIfNotExists} from "../../firebase-utils/firebase-client"
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class Login extends React.Component {
    componentDidMount() {
        this.getGoogleToken()
    }


    googleAuth = () => {
        firebaseAuth().signInWithRedirect(googleProvider);
    }

    getGoogleToken = () => {
        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user;
                const userInfo = {displayName, photoURL, uid, email};
                createUserIfNotExists(userInfo);
                localStorage.setItem('user', JSON.stringify(userInfo));
                this.props.history.push('/');
            }
        })
    }

    logout() {
        /**
         * To logout from Google use this function
         */
        firebaseAuth().signOut()
    }
    render() {
        return (<div>
                  <div className="container">
                    <div className="row" style={{ padding: '10px', paddingTop: '30%' }}>
                      <Grid item xs={12}>
                        <Paper style={{ textAlign: 'center', padding: '20px' }}>
                          <Typography gutterBottom variant="h6" component="h5" style={{ color: '#000000' }}>
                            Please login using your Google Account
                          </Typography>
                          <Button style={{ cursor: 'pointer' }} onClick={this.googleAuth}><img src="/images/btn_google_signin_dark_normal_web.png" alt="logo" /></Button>
                        </Paper>
                      </Grid>
                    </div>
                  </div>
                </div>)
     }
}

export default withRouter(Login)
