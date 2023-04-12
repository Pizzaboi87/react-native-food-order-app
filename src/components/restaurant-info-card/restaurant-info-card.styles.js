import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { StyledText } from "../../helpers/typography/text.helper";

export const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.ui.card};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.card};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Section = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: ${(props) => props.theme.space[2]};
`;

export const SectionEnd = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[0]};
`;

export const RatingNumber = styled.Text`
  margin-top: -2px;
  margin-left: ${(props) => props.theme.space[1]};
`;

export const SVG = styled(SvgXml)`
  width: ${(props) => props.theme.sizes[3]};
  height: ${(props) => props.theme.sizes[3]};
`;

export const Icon = styled.Image`
  width: ${(props) => props.theme.sizes[2]};
  height: ${(props) => props.theme.sizes[2]};
  margin-left: ${(props) => props.theme.space[2]};
  margin-bottom: -2.5px;
`;

export const DeliveryText = styled(StyledText).attrs({
  variant: "lightCaption",
})`
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.ui.success};
`;

export const NotDeliver = styled(DeliveryText)`
  color: ${(props) => props.theme.colors.ui.error};
`;
