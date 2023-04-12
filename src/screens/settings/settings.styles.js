import React from "react";
import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { List } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import { ScrollView } from "react-native";

export const SettingsItem = styled(List.Item).attrs({
  titleStyle: {
    color: theme.colors.ui.text,
    fontWeight: theme.fontWeights.bold,
  },
  descriptionStyle: {
    color: theme.colors.ui.text,
  },
})`
  padding: ${(props) => props.theme.space[3]};
`;

export const createIcon = (IconComponent) => (props) => {
  return <IconComponent {...props} />;
};

export const MenuIcon = styled(List.Icon).attrs({
  color: theme.colors.ui.text,
})``;

export const HeartIcon = styled(MenuIcon).attrs({
  icon: "heart",
})``;

export const DoorIcon = styled(MenuIcon).attrs({
  icon: "door",
})``;

export const AddressIcon = styled(MenuIcon).attrs({
  icon: "routes",
})``;

export const PersonalIcon = styled(MenuIcon).attrs({
  icon: "account-cog",
})``;

export const PasswordIcon = styled(MenuIcon).attrs({
  icon: "security",
})``;

export const OrdersIcon = styled(MenuIcon).attrs({
  icon: "pizza",
})``;

export const AvatarContainer = styled.View`
  align-items: center;
  padding-top: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const UserText = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.text};
  margin-top: ${(props) => props.theme.space[1]};
`;
