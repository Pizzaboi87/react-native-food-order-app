import { Button } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";

export const PictureMenuContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

const MenuButton = styled(Button).attrs({
  mode: "contained",
  contentStyle: {
    backgroundColor: theme.colors.brand.secondary,
  },
  labelStyle: {
    fontSize: 25,
    padding: 5,
  },
})``;

export const CameraButton = styled(MenuButton).attrs({
  icon: "camera",
})`
  margin-bottom: 30px;
`;

export const UploadButton = styled(MenuButton).attrs({
  icon: "cloud-upload",
})``;

export const ButtonText = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const TitleText = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.text};
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding-bottom: ${(props) => props.theme.space[4]};
  text-align: center;
`;
