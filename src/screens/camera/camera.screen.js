import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Camera, CameraType, takePictureAsync } from "expo-camera";
import {
  ProfileCamera,
  FlipButton,
  CameraContainer,
  CameraText,
  TakeAPicButton,
  ButtonContainer,
} from "./camera.styles";

export const CameraScreen = () => {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission || permission.status !== "granted") {
      requestPermission();
    }
  }, [permission]);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeAPicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
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
