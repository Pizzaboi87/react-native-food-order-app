import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";

export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;

export const UserAvatar = styled(Avatar.Icon).attrs({
  size: 150,
  icon: "cat",
  color: "white",
})`
  background-color: ${(props) => props.theme.colors.ui.brand};
`;
