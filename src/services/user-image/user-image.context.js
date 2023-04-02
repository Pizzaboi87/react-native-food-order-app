import React, { createContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";
import {
  loadStoredImage,
  storeImage,
} from "../firebase/firebase-config.service";
import { manipulateAsync } from "expo-image-manipulator";

export const UserImageContext = createContext();

export const UserImageContextProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(null);

  const saveImage = async (image, user) => {
    try {
      const userId = user;
      const { uri } = await manipulateAsync(
        image,
        [{ resize: { width: 500 } }],
        { format: "jpeg" }
      );
      storeImage(uri, `users/${userId}/profile.jpg`);
    } catch (error) {
      Alert.alert("Error", "An error happened during saving process.", [
        { text: "OK" },
      ]);
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
