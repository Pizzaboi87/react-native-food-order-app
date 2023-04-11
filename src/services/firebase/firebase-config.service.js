import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, get, ref as rtdbref, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmfc3QRM3nHNMO6SHCthlm8p3dr5UcF3g",
  authDomain: "mealstogo-2680a.firebaseapp.com",
  databaseURL:
    "https://mealstogo-2680a-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "mealstogo-2680a",
  storageBucket: "mealstogo-2680a.appspot.com",
  messagingSenderId: "1035111378933",
  appId: "1:1035111378933:web:32706dabfe671489033abc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const editUserDocument = async (
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

    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
  } else {
    await updateDoc(userDocRef, {
      ...additionalInformation,
    });
  }
  return userSnapShot;
};

export const getUserData = async (data) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    const userData = userSnapShot.data()[data];
    return userData;
  } else {
    return;
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

export const sendPasswordReset = async (email, setEmailPopup, setError) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setError("noError");
    setEmailPopup(true);
  } catch (err) {
    setEmailPopup(true);
    switch (err.message) {
      case "Firebase: Error (auth/invalid-email).":
        setError("Invalid email address.");
        break;
      case "Firebase: Error (auth/user-not-found).":
        setError("Email address is not registered.");
        break;
      default:
        setError("Error: ", err.message);
        break;
    }
  }
};

export const addAddressToUser = async (
  address,
  setAddressDone,
  setAddressWrong
) => {
  try {
    await editUserDocument(auth.currentUser, { address }).then(
      setAddressDone(true)
    );
  } catch (error) {
    setAddressWrong(true);
    console.log(error);
  }
};

export const storeImage = async (imageUri, imageUrl) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storageRef = ref(storage, imageUrl);
  const metadata = {
    contentType: "image/jpeg",
  };
  uploadBytes(storageRef, blob, metadata);
};

export const loadStoredImage = async (imageUrl) => {
  const storageRef = ref(storage, imageUrl);
  try {
    const url = await getDownloadURL(storageRef, 500);
    return url;
  } catch (error) {
    return;
  }
};

export const addFavouriteToUser = async (favourite) => {
  editUserDocument(auth.currentUser, {
    favourites: arrayUnion(favourite),
  });
};

export const removeFavouriteFromUser = async (value) => {
  try {
    const listDocRef = doc(db, "users", auth.currentUser.uid);
    const listSnapshot = await getDoc(listDocRef);
    const favourites = listSnapshot.data().favourites;
    const index = favourites.indexOf(value);

    if (index > -1) {
      const updatedFavourites = [...favourites];
      updatedFavourites.splice(index, 1);
      await updateDoc(listDocRef, {
        favourites: updatedFavourites,
      });
    } else {
      console.log("The element doesn't exist in the list.");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getDataFromDatabase = async (database, city, restaurantId) => {
  if (auth.currentUser) {
    try {
      const dbRef = rtdbref(getDatabase());
      const snapshot = await get(
        child(dbRef, `${database}/${city}/${restaurantId}`)
      );
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    return;
  }
};

export const findBranchByValue = async (value) => {
  if (auth.currentUser) {
    try {
      const dbRef = rtdbref(getDatabase());
      const snapshot = await get(child(dbRef, "coordinates"));
      if (snapshot.exists()) {
        const branches = snapshot.val();
        let result = null;
        Object.keys(branches).forEach((branchKey) => {
          const branch = branches[branchKey];
          if (branch.location.lat === value) {
            result = branchKey;
          }
        });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const setUserPersonalData = async (
  personalData,
  setPersonalDone,
  setPersonalError
) => {
  try {
    await editUserDocument(auth.currentUser, {
      displayName: personalData.nickName,
      personalData: {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        phone: personalData.phone,
      },
    }).then(setPersonalDone(true));
  } catch (error) {
    setPersonalError(true);
    console.log(error);
  }
};
