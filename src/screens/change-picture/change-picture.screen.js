import React from "react";
import {
  ButtonText,
  TitleText,
  CameraButton,
  PictureMenuContainer,
  UploadButton,
} from "./change-picture.styles";

export const ChangePictureScreen = ({ navigation }) => {
  return (
    <PictureMenuContainer>
      <TitleText variant="title">{`Choose the source\n of the image!`}</TitleText>
      <CameraButton onPress={() => navigation.navigate("Camera")}>
        <ButtonText variant="title">Camera</ButtonText>
      </CameraButton>
      <UploadButton onPress={() => navigation.navigate("Pick Image")}>
        <ButtonText variant="title">Upload</ButtonText>
      </UploadButton>
    </PictureMenuContainer>
  );
};
