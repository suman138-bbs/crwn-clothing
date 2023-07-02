import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account',
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  console.log(userDocRef);
  console.log(userSnapshot.exists())
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user',error.message)
    }

  }

  return userDocRef;

}


export const createAuthUserWithEmailAndPassword = async (email,password) => {
  
  if (!email || !password)
    return;

  return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  
  if (!email || !password)
    return;

  return await signInWithEmailAndPassword (auth, email, password);
}


export const signOutUser = async () => {
  return await signOut(auth)
};


