import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";

export const SettingsItem = styled(List.Item).attrs({
  titleStyle: { color: "white" },
  descriptionStyle: { color: "white" },
})`
  padding: ${(props) => props.theme.space[3]};
`;

export const HeartIcon = styled(List.Icon).attrs({
  icon: "heart",
  color: "white",
})``;

export const DoorIcon = styled(List.Icon).attrs({
  icon: "door",
  color: "white",
})``;

export const AvatarContainer = styled.View`
  align-items: center;
  padding-top: ${(props) => props.theme.space[4]};
`;

export const UserAvatar = styled(Avatar.Icon).attrs({
  size: 150,
  icon: "cat",
  color: "white",
})`
  background-color: ${(props) => props.theme.colors.ui.brand};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
