import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBPpHljG05YtUS3dCVmo-jRVBWi1xhqRH0",
    authDomain: "od-clothing.firebaseapp.com",
    databaseURL: "https://od-clothing.firebaseio.com",
    projectId: "od-clothing",
    storageBucket: "od-clothing.appspot.com",
    messagingSenderId: "341139105037",
    appId: "1:341139105037:web:e19a89ff2494fc9ecf3c44",
    measurementId: "G-98G4J1GYZG"
  };


  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;


