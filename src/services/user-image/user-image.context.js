import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserImageContext = createContext();

export const UserImageContextProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(null);

  const saveImage = async (image, user) => {
    try {
      const savePic = image;
      await AsyncStorage.setItem(`${user}-photo`, savePic);
    } catch (error) {
      Alert.alert("Error", "An error happened during saving process.", [
        { text: "OK" },
      ]);
    }
  };

  const saveImageFromUpload = async (image, user) => {
    try {
      const saveUploadPic = image.assets[0].uri;
      await AsyncStorage.setItem(`${user}-photo`, saveUploadPic);
    } catch (error) {
      Alert.alert("Error", "An error happened during saving process.", [
        { text: "OK" },
      ]);
    }
  };

  const loadImage = async (user) => {
    try {
      const image = await AsyncStorage.getItem(`${user}-photo`);
      if (image !== null) {
        setUserImage(image);
        return userImage;
      }
    } catch (error) {
      Alert.alert("Error", "An error happened during loading process.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <UserImageContext.Provider
      value={{
        userImage,
        loadImage,
        saveImage,
        saveImageFromUpload,
      }}
    >
      {children}
    </UserImageContext.Provider>
  );
};
