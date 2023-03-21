import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmfc3QRM3nHNMO6SHCthlm8p3dr5UcF3g",
  authDomain: "mealstogo-2680a.firebaseapp.com",
  projectId: "mealstogo-2680a",
  storageBucket: "mealstogo-2680a.appspot.com",
  messagingSenderId: "1035111378933",
  appId: "1:1035111378933:web:32706dabfe671489033abc",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const signInWithEmail = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};
