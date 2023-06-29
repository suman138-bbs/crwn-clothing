import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBE-OlU3Jiwsi2QNsXOpbVnLgd_O4U-d7Y",
  authDomain: "crown-clothing-db-8ab07.firebaseapp.com",
  projectId: "crown-clothing-db-8ab07",
  storageBucket: "crown-clothing-db-8ab07.appspot.com",
  messagingSenderId: "728502397819",
  appId: "1:728502397819:web:f8411ad5f70932485febde"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider;
provider.setCustomParameters({
    prompt:'select_account',
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
}