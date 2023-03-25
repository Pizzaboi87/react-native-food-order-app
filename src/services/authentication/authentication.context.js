import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import {
  signInWithEmail,
  registerWithEmail,
  signOutUser,
} from "../firebase/firebase-config.service";

export const AuthenticationContext = createContext();
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email address.");
          setIsLoading(false);
          return;
        } else {
          setCurrentUser(user);
          setUid(user.uid);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.messge);
      });
  };

  const onRegister = (
    nickName,
    email,
    password,
    repeatedPassword,
    navigation
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    } else {
      registerWithEmail(email, password, nickName)
        .then((userCredential) => {
          setCurrentUser(userCredential.user);
          setUid(userCredential.user.uid);
          setIsLoading(false);
        })
        .then(() =>
          Alert.alert("Before we continue...", "Please check your mailbox", [
            { text: "OK" },
          ])
        )
        .then(() => navigation.navigate("Main"))
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  };

  const onSignOut = () => {
    setCurrentUser(null);
    setUid(null);
    signOutUser();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: currentUser && currentUser.emailVerified,
        currentUser,
        uid,
        isLoading,
        error,
        setError,
        onLogin,
        onRegister,
        onSignOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
