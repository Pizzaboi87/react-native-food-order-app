import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import {
  ProfileCamera,
  FlipButton,
  CameraScreenContainer,
  CameraText,
  TakeAPicButton,
  ButtonContainer,
} from "./camera.styles";

export const CameraScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const { saveImage } = useContext(UserImageContext);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission || permission.status !== "granted") {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeAPicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await saveImage(photo.uri, currentUser);
      navigation.navigate("My Settings");
    }
  };

  if (permission && permission.status === "granted") {
    return (
      <CameraScreenContainer>
        <ProfileCamera
          ref={(camera) => (cameraRef.current = camera)}
          type={type}
        >
          <ButtonContainer>
            <TouchableOpacity onPress={toggleCameraType}>
              <FlipButton />
            </TouchableOpacity>
            <TouchableOpacity onPress={takeAPicture}>
              <TakeAPicButton />
            </TouchableOpacity>
          </ButtonContainer>
        </ProfileCamera>
      </CameraScreenContainer>
    );
  } else {
    return (
      <CameraScreenContainer>
        <CameraText variant="title">
          Need your permission to use the camera.
        </CameraText>
      </CameraScreenContainer>
    );
  }
};
