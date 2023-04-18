import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { AuthButton } from "../../helpers/account-styles/account-styles.helper";
import { theme } from "../../infrastructure/theme";

export const RegisterButton = styled(AuthButton).attrs({
  icon: "account-plus-outline",
})``;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 30,
})`
  margin: 0 auto;
`;

export const Buttons = styled.View`
  align-items: center;
  width: 300px;
`;
