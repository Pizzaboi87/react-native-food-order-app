import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import database, { firebase } from "@react-native-firebase/database";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1035111378933-h7479g0o6fe9p9tct1eumq788qv96r8t.apps.googleusercontent.com",
});

const db = firebase
  .app()
  .database(
    "https://mealstogo-2680a-default-rtdb.europe-west1.firebasedatabase.app/"
  );

export const editUserDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = firestore().doc(`users/${userAuth.uid}`);
  const userSnapShot = await userDocRef.get();

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    await userDocRef.set({
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
  } else {
    await userDocRef.update({
      ...additionalInformation,
    });
  }
  return userSnapShot;
};

export const getUserData = async (data) => {
  const userDocRef = firestore().doc(`users/${auth().currentUser.uid}`);
  const userSnapShot = await userDocRef.get();

  if (userSnapShot.exists) {
    const userData = userSnapShot.data()[data];
    return userData;
  } else {
    return;
  }
};

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  const user_sign_in = await auth().signInWithCredential(googleCredential);

  editUserDocument(auth().currentUser);

  return user_sign_in;
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) {
    return;
  }
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Failed to sign in with email and password", error);
    throw error;
  }
};

export const registerWithEmail = async (email, password, nickName) => {
  if (!email || !password) {
    return;
  }
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );
  await auth().currentUser.updateProfile({ displayName: nickName });
  await auth().currentUser.sendEmailVerification();
  return userCredential;
};

export const signOutUser = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordReset = async (email, setEmailPopup, setError) => {
  try {
    await auth().sendPasswordResetEmail(email);
    setError("noError");
    setEmailPopup(true);
  } catch (err) {
    setEmailPopup(true);
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/user-not-found":
        setError("Email address is not registered.");
        break;
      default:
        setError("Error: ", err.message);
        break;
    }
  }
};

export const updateUserPassword = (
  currentPassword,
  newPassword,
  setChangeSuccess,
  setChangeFail,
  setAuthenticationFail
) => {
  const user = auth().currentUser;
  const email = auth().currentUser.email;
  const credential = auth.EmailAuthProvider.credential(email, currentPassword);

  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user
        .updatePassword(newPassword)
        .then(() => {
          setChangeSuccess(true);
        })
        .catch((error) => {
          setChangeFail(true);
          console.log(error);
        });
    })
    .catch((error) => {
      setAuthenticationFail(true);
      console.log(error);
    });
};

export const addAddressToUser = async (
  address,
  setAddressDone,
  setAddressWrong
) => {
  try {
    await editUserDocument(auth().currentUser, { address });
    setAddressDone(true);
  } catch (error) {
    setAddressWrong(true);
    console.log(error);
  }
};

export const storeImage = async (imageUri, imageUrl) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const storageRef = storage().ref(imageUrl);
  const metadata = {
    contentType: "image/jpeg",
  };
  await storageRef.put(blob, metadata);
};

export const loadStoredImage = async (imageUrl) => {
  const storageRef = storage().ref(imageUrl);
  try {
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (error) {
    return;
  }
};

export const addFavouriteToUser = async (favourite) => {
  const currentUser = auth().currentUser;
  const userDocRef = firestore().doc(`users/${currentUser.uid}`);

  await userDocRef.update({
    favourites: firestore.FieldValue.arrayUnion(favourite),
  });
};

export const addOrderToHistory = async (order) => {
  const currentUser = auth().currentUser;
  const userDocRef = firestore().doc(`users/${currentUser.uid}`);

  await userDocRef.update({
    orderHistory: firestore.FieldValue.arrayUnion(order),
  });
};

export const removeFavouriteFromUser = async (value) => {
  try {
    const listDocRef = firestore()
      .collection("users")
      .doc(auth().currentUser.uid);
    const listSnapshot = await listDocRef.get();
    const favourites = listSnapshot.data().favourites;
    const index = favourites.indexOf(value);
    if (index > -1) {
      const updatedFavourites = [...favourites];
      updatedFavourites.splice(index, 1);
      await listDocRef.update({
        favourites: updatedFavourites,
      });
    } else {
      console.log("The element doesn't exist in the list.");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getDataFromDatabase = async (
  database,
  city = "",
  restaurantId = ""
) => {
  if (!auth().currentUser || !database || !city || !restaurantId) {
    return null;
  }

  try {
    const dbRef = db.ref(`${database}/${city}/${restaurantId}`);
    const snapshot = await dbRef.once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const findBranchByValue = async (value) => {
  if (auth().currentUser) {
    try {
      const dbRef = db.ref("coordinates");
      const snapshot = await dbRef.once("value");
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
    await editUserDocument(auth().currentUser, {
      displayName: personalData.nickName,
      personalData: {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        phone: personalData.phone,
      },
    });
    setPersonalDone(true);
  } catch (error) {
    setPersonalError(true);
    console.log(error);
  }
};
