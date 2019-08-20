import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB7zn39W2IwRQJsIAV7BQ4FZFNLTNsobtQ",
  authDomain: "crwn-db-67e17.firebaseapp.com",
  databaseURL: "https://crwn-db-67e17.firebaseio.com",
  projectId: "crwn-db-67e17",
  storageBucket: "",
  messagingSenderId: "974232289275",
  appId: "1:974232289275:web:b7ad4548ff6f5b29"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error) {
      console.log('error created user', error.mesage);
    }
  }


  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
