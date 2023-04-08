import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import {
  ButtonText,
  TitleText,
  CameraButton,
  PictureMenuContainer,
  UploadButton,
} from "./change-picture.styles";

export const ChangePictureScreen = ({ navigation }) => {
  const { uid } = useContext(AuthenticationContext);
  const { saveImage } = useContext(UserImageContext);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [photoError, setPhotoError] = useState(false);
  const [photoDone, setPhotoDone] = useState(false);

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
      await saveImage(result.assets[0].uri, uid, setPhotoDone, setPhotoError);
    } else {
      setPhotoError(true);
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
      <DialogWindow
        variant="error"
        message="You didn't choose any photo."
        visible={photoError}
        setVisible={setPhotoError}
      />
      <DialogWindow
        variant="error"
        message="An error happened during saving process."
        visible={photoError}
        setVisible={setPhotoError}
      />
      <DialogWindow
        variant="done"
        message={`Upload Successful\nYour profile photo has been uploaded, it may take some time, to update.`}
        visible={photoDone}
        setVisible={setPhotoDone}
        navigation={navigation}
        whereTo="My Settings"
      />
    </PictureMenuContainer>
  );
};
