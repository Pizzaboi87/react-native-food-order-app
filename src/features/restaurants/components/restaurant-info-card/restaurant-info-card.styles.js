import styled from "styled-components";
import { Card } from "react-native-paper";
import { View, Image } from "react-native";
import { SvgXml } from "react-native-svg";

export const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Info = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Section = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: ${(props) => props.theme.space[2]};
`;

export const SectionEnd = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Rating = styled(View)`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[0]};
`;

export const SVG = styled(SvgXml)`
  width: ${(props) => props.theme.sizes[2]};
  height: ${(props) => props.theme.sizes[2]};
`;

export const Icon = styled(Image)`
  width: ${(props) => props.theme.sizes[1]};
  height: ${(props) => props.theme.sizes[1]};
  margin-left: ${(props) => props.theme.space[2]};
  margin-bottom: -2.5px;
`;
