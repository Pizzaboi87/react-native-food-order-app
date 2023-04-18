import styled from "styled-components/native";
import { AuthButton } from "../../helpers/account-styles/account-styles.helper";

export const Buttons = styled.View`
  align-items: center;
  width: 300px;
`;

export const LoginButton = styled(AuthButton).attrs({
  icon: "lock-open-outline",
})``;

export const EmailButton = styled(LoginButton)`
  width: 230px;
`;
