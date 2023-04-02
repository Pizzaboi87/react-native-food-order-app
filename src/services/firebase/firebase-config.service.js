import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";
import {
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { manipulateAsync } from "expo-image-manipulator";

const firebaseConfig = {
  apiKey: "AIzaSyDmfc3QRM3nHNMO6SHCthlm8p3dr5UcF3g",
  authDomain: "mealstogo-2680a.firebaseapp.com",
  projectId: "mealstogo-2680a",
  storageBucket: "mealstogo-2680a.appspot.com",
  messagingSenderId: "1035111378933",
  appId: "1:1035111378933:web:32706dabfe671489033abc",
};

initializeApp(firebaseConfig);
const db = getFirestore();

export const auth = getAuth();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      }).then(
        Alert.alert(
          "Successful Modification",
          "Your details has been added to your account."
        )
      );
    } catch (error) {
      Alert.alert("Error", "Oops.. Something went wrong..");
      console.log("error during create the user", error);
    }
  } else {
    try {
      await updateDoc(userDocRef, {
        ...additionalInformation,
      }).then(
        Alert.alert(
          "Successful Modification",
          "Your details has been modified on your account."
        )
      );
    } catch (error) {
      Alert.alert("Error", "Oops.. Something went wrong.");
      console.log("error during the update", error);
    }
  }

  return userSnapShot;
};

export const getUserData = async () => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    const savedAddress = userSnapShot.data().address;
    return savedAddress;
  } else {
    console.log("User didn't set-up address in database.");
  }
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email, password, nickName) => {
  if (!email || !password) {
    return;
  }
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: nickName });
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const addAddressToUser = async (address) => {
  await createUserDocumentFromAuth(auth.currentUser, { address });
};

const storage = getStorage();

export const storeImage = async (imageUri, imageUrl) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storageRef = ref(storage, imageUrl);
  const metadata = {
    contentType: "image/jpeg",
  };
  uploadBytes(storageRef, blob, metadata).then((snapshot) => {
    console.log("File uploaded.");
  });
};

export const loadStoredImage = async (imageUrl) => {
  const storageRef = ref(storage, imageUrl);
  const url = await getDownloadURL(storageRef, 500);
  return url;
};
