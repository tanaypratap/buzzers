import React from 'react'
import * as firebaseui from 'firebaseui'
import firebase from '../../firebase';

class Login extends React.Component {
    componentDidMount() {
        this.enableFirebaseAuth.bind(this)
    }

    enableFirebaseAuth() {
        const uiConfig = { signInSuccessUrl: "http://localhost:3000/", signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID] };
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    render() {
        return <div id="firebaseui-auth-container"></div>
     }
}

export default Login