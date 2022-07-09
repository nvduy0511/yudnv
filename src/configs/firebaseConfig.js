import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCK1Lt99Dr-cJI1BsagD5KRbWkJjX9ZOBM',
    authDomain: 'chat-app-9eb48.firebaseapp.com',
    projectId: 'chat-app-9eb48',
    storageBucket: 'chat-app-9eb48.appspot.com',
    messagingSenderId: '716172390369',
    appId: '1:716172390369:web:ec2cdbc67ab39e85e7eca0',
    measurementId: 'G-T66D98BTFT',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

export default firebase;
export { uiConfig, firebaseApp };
