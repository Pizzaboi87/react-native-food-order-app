import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { Camera } from "expo-camera";
import { IconButton } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";

export const CameraScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const ProfileCamera = styled(Camera).attrs({
  ratio: "16:9",
})`
  width: 100%;
  height: 100%;
`;

export const CameraText = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.brand};
`;

export const FlipButton = styled(IconButton).attrs({
  icon: "camera-flip",
  size: 75,
  iconColor: theme.colors.ui.quaternary,
})``;

export const TakeAPicButton = styled(IconButton).attrs({
  icon: "camera",
  size: 75,
  iconColor: theme.colors.ui.quaternary,
})`
  padding-top: 5px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  align-self: center;
`;
