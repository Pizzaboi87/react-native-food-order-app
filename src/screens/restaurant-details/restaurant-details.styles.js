import React from "react";
import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { List } from "react-native-paper";

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

export const createIcon = (IconComponent) => (props) => {
  return <IconComponent {...props} />;
};

export const MenuIcon = styled(List.Icon).attrs({
  color: theme.colors.ui.quaternary,
})``;

export const BreakfastIcon = styled(MenuIcon).attrs({
  icon: "bread-slice",
})``;

export const LunchIcon = styled(MenuIcon).attrs({
  icon: "hamburger",
})``;

export const DinnerIcon = styled(MenuIcon).attrs({
  icon: "food-variant",
})``;

export const DrinksIcon = styled(MenuIcon).attrs({
  icon: "cup",
})``;
