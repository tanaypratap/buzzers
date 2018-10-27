import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDe8UizhOLkVq0WZgyree2XinGNbBbd1No',
    authDomain: 'sapphireapp-483.firebaseapp.com',
    databaseURL: 'https://sapphireapp-483.firebaseio.com',
    projectId: 'sapphireapp-483',
    storageBucket: 'sapphireapp-483.appspot.com',
    messagingSenderId: '930819397911'
  };

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();