import React, { useContext, useEffect } from "react";
import { Alert } from "react-native";
import {
  ButtonText,
  TitleText,
  CameraButton,
  PictureMenuContainer,
  UploadButton,
} from "./change-picture.styles";
import * as ImagePicker from "expo-image-picker";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";

export const ChangePictureScreen = ({ navigation }) => {
  const currentUser = useContext(AuthenticationContext);
  const { saveImageFromUpload } = useContext(UserImageContext);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (!status || status !== "granted") {
      requestPermission();
    }
  }, [status, requestPermission]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await saveImageFromUpload(result, currentUser);
      navigation.navigate("My Settings");
    } else {
      Alert.alert("Error", "You didn't choose any photo", [{ text: "OK" }]);
    }
  };

  return (
    <PictureMenuContainer>
      <TitleText variant="title">
        {"Choose the source\n of the image!"}
      </TitleText>
      <CameraButton onPress={() => navigation.navigate("Camera")}>
        <ButtonText variant="title">Camera</ButtonText>
      </CameraButton>
      <UploadButton onPress={pickImageAsync}>
        <ButtonText variant="title">Upload</ButtonText>
      </UploadButton>
    </PictureMenuContainer>
  );
};
