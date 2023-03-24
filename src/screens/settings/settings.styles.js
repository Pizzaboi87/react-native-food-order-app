import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { List, Avatar } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";

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

export const HeartIcon = styled(List.Icon).attrs({
  icon: "heart",
  color: theme.colors.ui.text,
})``;

export const DoorIcon = styled(List.Icon).attrs({
  icon: "door",
  color: theme.colors.ui.text,
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

export const UserText = styled(StyledText)`
  color: ${(props) => props.theme.colors.ui.text};
`;
