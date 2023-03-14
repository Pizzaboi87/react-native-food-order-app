import styled from "styled-components";
import { Card } from "react-native-paper";
import { Text } from "react-native";

export const RestaurantCard = styled(Card)`
  background-color: white;
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: 20px;
  background-color: white;
`;

export const RestaurantCardTitle = styled(Text)`
  padding: 16px;
  font-weight: bold;
`;
