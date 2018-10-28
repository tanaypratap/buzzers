import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseAuth, googleProvider } from '../../firebase';
import {createUserIfNotExists} from "../../firebase-utils/firebase-client"

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
                    <h1> We need you to login using your Google Account</h1>
                    <button onClick={this.googleAuth}>Login Using Google</button>
                </div>)
     }
}

export default withRouter(Login)