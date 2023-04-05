import React from "react";
import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { List } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import { ActivityIndicator } from "react-native";

export const DetailsContainer = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const ListTitle = styled(List.Accordion).attrs({
  titleStyle: {
    color: theme.colors.ui.quaternary,
    fontWeight: "bold",
  },
})`
  background-color: ${(props) => props.theme.colors.ui.title};
  padding-left: ${(props) => props.theme.space[3]};
  border: 1px solid white;
`;

export const MenuIcon = styled(List.Icon).attrs({
  color: theme.colors.ui.quaternary,
})``;

export const FoodContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: ${(props) => props.theme.sizes[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.card};
  margin-left: -32px;
`;

export const FoodText = styled(StyledText)`
  font-size: ${(props) => props.theme.sizes[3]};
  padding-top: ${(props) => props.theme.space[0]};
  padding-bottom: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const DescriptionText = styled(StyledText)`
  font-size: ${(props) => props.theme.sizes[2]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  text-align: justify;
  font-style: italic;
`;

export const PriceText = styled(StyledText)`
  font-size: ${(props) => props.theme.sizes[3]};
  margin-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
  align-self: flex-end;
`;

export const createIcon = (icon) => (props) => {
  return <MenuIcon {...props} icon={icon} />;
};

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 50,
})``;
