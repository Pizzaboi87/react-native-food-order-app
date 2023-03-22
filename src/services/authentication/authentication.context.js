import React, { createContext, useState } from "react";
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
      registerWithEmail(email, password)
        .then((userCredential) => {
          userCredential.user.displayName = nickName;
          setCurrentUser(userCredential.user);
          setIsLoading(false);
        })
        .then(alert("Please check your mailbox"))
        .then(() => navigation.navigate("Main"))
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  };

  const onSignOut = () => {
    setCurrentUser(null);
    signOutUser();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: currentUser && currentUser.emailVerified,
        currentUser,
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
