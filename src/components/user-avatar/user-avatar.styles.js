import styled from "styled-components/native";
import { Avatar } from "react-native-paper";

export const UserAvatar = styled(Avatar.Icon).attrs({
  icon: "cat",
  color: "white",
})`
  background-color: ${(props) => props.theme.colors.ui.brand};
`;

export const UserPhoto = styled(Avatar.Image)`
  background-color: ${(props) => props.theme.colors.ui.brand};
`;
