import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProfileCamera,
  FlipButton,
  CameraContainer,
  CameraText,
  TakeAPicButton,
  ButtonContainer,
} from "./camera.styles";

export const CameraScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthenticationContext);
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
      AsyncStorage.setItem(`${currentUser.uid}-photo`, photo.uri);
      navigation.navigate("My Settings");
    }
  };

  if (permission && permission.status === "granted") {
    return (
      <CameraContainer>
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
      </CameraContainer>
    );
  } else {
    return (
      <CameraContainer>
        <CameraText variant="title">
          Need your permission to use the camera.
        </CameraText>
      </CameraContainer>
    );
  }
};
