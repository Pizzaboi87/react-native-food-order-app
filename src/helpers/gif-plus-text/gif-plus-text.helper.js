import styled from "styled-components/native";
import { Image } from "react-native";
import { StyledText } from "../typography/text.helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
  align-items: center;
  justify-content: center;
`;

export const Title = styled(StyledText).attrs({
  variant: "error",
})`
  text-align: center;
  align-self: center;
  font-size: ${(props) => props.theme.fontSizes.bigTitle};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Message = styled(StyledText).attrs({
  variant: "error",
})`
  color: ${(props) => props.theme.colors.ui.error};
  align-self: center;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const Picture = styled(Image)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;
