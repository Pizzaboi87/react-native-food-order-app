import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";
import { Card } from "react-native-paper";
import { theme } from "../../infrastructure/theme/";

export const FavouritesWrapper = styled(Card).attrs({
  mode: "elevated",
  elevation: 5,
})`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.card};
  border: 1px ${theme.colors.ui.brand};
  border-radius: 0;
`;

export const CardBox = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
`;

export const Title = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.text};
`;
