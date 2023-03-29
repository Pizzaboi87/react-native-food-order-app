import styled from "styled-components/native";
import { Image } from "react-native";
import { StyledText } from "../typography/text.helper";

export const GifContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
  align-items: center;
  justify-content: center;
`;

export const GifMessage = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.error};
  align-self: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const Gif = styled(Image)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;
