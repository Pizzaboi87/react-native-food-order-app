import React, { useState, useRef, useEffect, useContext } from "react";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Style from "./camera.styles";

export const CameraScreen = ({ navigation }) => {
  const [photoDone, setPhotoDone] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const { uid } = useContext(AuthenticationContext);
  const { saveImage } = useContext(UserImageContext);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission || permission.status !== "granted") {
      requestPermission();
    }
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeAPicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await saveImage(photo.uri, uid, setPhotoDone, setPhotoError);
    }
  };

  if (permission && permission.status === "granted") {
    return (
      <Style.CameraScreenContainer>
        <Style.ProfileCamera
          ref={(camera) => (cameraRef.current = camera)}
          type={type}
        >
          <Style.ButtonContainer>
            <TouchableOpacity onPress={toggleCameraType}>
              <Style.FlipButton />
            </TouchableOpacity>
            <TouchableOpacity onPress={takeAPicture}>
              <Style.TakeAPicButton />
            </TouchableOpacity>
          </Style.ButtonContainer>
        </Style.ProfileCamera>
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
      </Style.CameraScreenContainer>
    );
  } else {
    return (
      <Style.CameraScreenContainer>
        <Style.CameraText variant="title">
          Need your permission to use the camera.
        </Style.CameraText>
      </Style.CameraScreenContainer>
    );
  }
};
