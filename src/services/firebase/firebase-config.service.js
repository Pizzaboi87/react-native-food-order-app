import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmfc3QRM3nHNMO6SHCthlm8p3dr5UcF3g",
  authDomain: "mealstogo-2680a.firebaseapp.com",
  projectId: "mealstogo-2680a",
  storageBucket: "mealstogo-2680a.appspot.com",
  messagingSenderId: "1035111378933",
  appId: "1:1035111378933:web:32706dabfe671489033abc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
