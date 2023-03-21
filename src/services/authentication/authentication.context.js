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
        setCurrentUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        const errorMessage = err.message
          .slice(10, err.message.length)
          .split("(");
        setError(errorMessage[0].toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      registerWithEmail(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setCurrentUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          const errorMessage = err.message
            .slice(10, err.message.length)
            .split("(");
          setError(errorMessage[0].toString());
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
        isAuthenticated: !!currentUser,
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
