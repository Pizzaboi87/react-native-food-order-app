import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";
import { Button, Card, ActivityIndicator } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export const HeaderContainer = styled.View`
  padding-top: ${(props) => props.theme.sizes[2]}
  height: 80px;
`;

export const MainTitle = styled(StyledText).attrs({
  variant: "title",
})`
  font-size: ${(props) => props.theme.fontSizes.bigTitle};
  text-align: center;
  font-weight: normal;
`;

export const AvatarContainer = styled(TouchableOpacity)`
  position: absolute;
  top: 17.5px;
  right: ${(props) => props.theme.sizes[2]};
`;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 50,
})`
  margin: 0 auto;
`;

export const OrderContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const MinusIcon = styled(AntDesign).attrs({
  color: theme.colors.ui.title,
  size: 30,
  name: "minuscircle",
})``;

export const PlusIcon = styled(AntDesign).attrs({
  color: theme.colors.ui.title,
  size: 30,
  name: "pluscircle",
})``;

export const OrderCard = styled(Card)`
  margin-top: ${(props) => props.theme.sizes[3]};
  background-color: ${(props) => props.theme.colors.ui.card};
  width: 90%;
`;

export const OrderTitle = styled(Card.Title).attrs({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
})``;

export const OrderText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const OrderTextBold = styled(OrderText)`
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const OrderTextError = styled(OrderTextBold)`
  color: ${(props) => props.theme.colors.ui.error};
`;

export const OrderDetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const OrderProduct = styled.View`
  justify-content: center;
  width: 140px;
  height: ${(props) => props.theme.sizes[6]};
`;

export const OrderQuantity = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  height: ${(props) => props.theme.sizes[6]};
`;

export const OrderPrice = styled.View`
  align-items: flex-end;
  justify-content: center;
  width: 55px;
  height: ${(props) => props.theme.sizes[6]};
`;

export const OrderTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const DeliveryPrice = styled(OrderTotal)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const HorizontalLine = styled.View`
  border-bottom-color: ${(props) => props.theme.colors.ui.text};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const PaymentButton = styled(Button).attrs({
  mode: "contained-tonal",
  buttonColor: theme.colors.brand.secondary,
  labelStyle: {
    fontSize: 20,
    color: theme.colors.ui.tertiary,
  },
})`
  margin-bottom: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.sizes[1]};
  padding: ${(props) => props.theme.sizes[0]};
`;
