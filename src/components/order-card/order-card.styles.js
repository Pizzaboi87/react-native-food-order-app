import styled from "styled-components/native";
import { Button, Card } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const OrderCard = styled(Card)`
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.ui.card};
  padding-left: 10px;
  padding-right: 10px;
`;

export const OrderView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextNormal = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const TextBold = styled(TextNormal)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const TextWithMargin = styled(TextBold)`
  margin-bottom: 10px;
`;

export const RestaurantImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export const ReOrderButton = styled(Button).attrs({
  mode: "contained",
  buttonColor: theme.colors.ui.title,
  labelStyle: {
    fontSize: 16,
  },
})`
  margin-top: 10px;
  width: 100%;
  align-self: flex-start;
  border-radius: 10px;
`;
