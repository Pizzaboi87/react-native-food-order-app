import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
  },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const BigGif = styled(Gif)`
  width: 250px;
  height: 250px;
  margin-bottom: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
`;

export const PayMessage = styled.Text`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.space[4]};
  color: ${(props) => props.theme.colors.ui.text};
`;
