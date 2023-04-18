import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { AuthButton } from "../../helpers/account-styles/account-styles.helper";
import { theme } from "../../infrastructure/theme";

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

export const GoogleButton = styled(AuthButton).attrs({
  icon: "google",
  buttonColor: theme.colors.ui.tertiary,
  textColor: theme.colors.brand.primary,
})`
  width: 230px;
  border: 1px solid ${theme.colors.brand.primary};
`;

export const LoginButton = styled(AuthButton).attrs({
  icon: "lock-open-outline",
})``;

export const EmailButton = styled(LoginButton)`
  width: 230px;
`;
