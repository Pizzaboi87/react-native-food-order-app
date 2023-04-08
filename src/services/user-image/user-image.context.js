import React, { createContext, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { manipulateAsync } from "expo-image-manipulator";
import {
  loadStoredImage,
  storeImage,
} from "../firebase/firebase-config.service";

export const UserImageContext = createContext();

export const UserImageContextProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(null);

  const saveImage = async (image, user, setDone, setError) => {
    try {
      const userId = user;
      const { uri } = await manipulateAsync(
        image,
        [{ resize: { width: 500 } }],
        { format: "jpeg" }
      );
      storeImage(uri, `users/${userId}/profile.jpg`);
      setDone(true);
    } catch (error) {
      setError(true);
    }
  };

  const loadImage = async (user) => {
    const imageUrl = `users/${user}/profile.jpg`;
    const url = await loadStoredImage(imageUrl);
    setUserImage(url);
  };

  const useLoadImage = (uid) => {
    useFocusEffect(
      useCallback(() => {
        if (uid) {
          const getProfilePicture = async (user) => {
            await loadImage(user);
          };
          getProfilePicture(uid);
        }
      }, [uid])
    );
  };

  return (
    <UserImageContext.Provider
      value={{
        userImage,
        loadImage,
        saveImage,
        useLoadImage,
      }}
    >
      {children}
    </UserImageContext.Provider>
  );
};
