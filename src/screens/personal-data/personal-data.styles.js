import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { StyledText } from "../../helpers/typography/text.helper";
import { ScrollView } from "react-native";
import { Image as Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import { TextInput, Button } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const CorrectedGif = styled(Gif)`
  margin-right: 28%;
`;

export const Title = styled(StyledText)`
  margin-bottom: ${(props) => props.theme.sizes[4]}
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const DataInput = styled(TextInput)`
  margin-bottom: ${(props) => props.theme.space[4]}
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${(props) => props.width}px;
`;

export const Submit = styled(Button).attrs({
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

export const PhoneNumber = styled(PhoneInput).attrs({
  containerStyle: {
    width: 300,
    backgroundColor: theme.colors.bg.primary,
    marginBottom: 25,
  },
})``;
