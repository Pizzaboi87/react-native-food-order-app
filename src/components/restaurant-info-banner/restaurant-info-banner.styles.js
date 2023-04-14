import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const RestaurantCard = styled(Card)`
  margin-top: ${(props) => props.theme.sizes[3]};
  border-radius: 0;
`;

export const CardContent = styled(Card.Content)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const DetailsContainer = styled.View`
  width: 250px;
  justify-content: center;
`;

export const SmallContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DetailText = styled.Text`
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-size: ${(props) => props.theme.fontSizes.button};
`;

export const DetailTextUp = styled(DetailText)`
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const DetailTextBold = styled.Text`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const RestaurantImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
