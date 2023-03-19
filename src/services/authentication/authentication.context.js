import React, { createContext, useState } from "react";
import { signInWithEmail } from "../firebase/firebase-config.service";

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
        console.log(currentUser);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.code.toString());
      });
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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
