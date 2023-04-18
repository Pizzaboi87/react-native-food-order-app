import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Style from "./change-picture.styles";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";

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
    <Style.PictureMenuContainer>
      <Style.TitleText variant="title">
        {"Choose the source\n of the image!"}
      </Style.TitleText>
      <Style.CameraButton onPress={() => navigation.navigate("Camera")}>
        <Style.ButtonText variant="title">Camera</Style.ButtonText>
      </Style.CameraButton>
      <Style.UploadButton onPress={pickImageAsync}>
        <Style.ButtonText variant="title">Upload</Style.ButtonText>
      </Style.UploadButton>
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
        message={
          "Upload Successful\nYour profile photo has been uploaded, it may take some time, to update."
        }
        visible={photoDone}
        setVisible={setPhotoDone}
        navigation={navigation}
        whereTo="My Settings"
      />
    </Style.PictureMenuContainer>
  );
};
