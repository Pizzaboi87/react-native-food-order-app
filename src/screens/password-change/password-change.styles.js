import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { ScrollView } from "react-native";
import { StyledText } from "../../helpers/typography/text.helper";

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
})`
  padding-top: 50px;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const Title = styled(StyledText)`
  margin-bottom: ${(props) => props.theme.sizes[4]}
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const PasswordInput = styled(TextInput)`
  margin-bottom: ${(props) => props.theme.space[4]}
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${(props) => props.width}px;
`;

export const ChangeButton = styled(Button).attrs({
  mode: "contained",
  labelStyle: {
    fontSize: 15,
  },
})`
  background-color: ${(props) => props.theme.colors.ui.success};
  width: 300px;
  border-radius: ${(props) => props.theme.sizes[0]};
  padding: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[4]};
`;
