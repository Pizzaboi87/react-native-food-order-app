import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { StyledText } from "../typography/text.helper";
import { theme } from "../../infrastructure/theme";

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 300px;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const Title = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const JustTextButton = styled(Button).attrs({
  textColor: theme.colors.ui.text,
})`
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-top: ${(props) => props.theme.space[2]};
`;
