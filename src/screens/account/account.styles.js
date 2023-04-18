import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";
import { Picture as Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import { AuthButton } from "../../helpers/account-styles/account-styles.helper";

export const LoginButton = styled(AuthButton).attrs({
  icon: "lock-open-outline",
})``;

export const RegisterButton = styled(AuthButton).attrs({
  icon: "account-plus-outline",
})``;

export const MainTitle = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: ${(props) => props.theme.space[4]};
  text-align: center;
`;

export const AnimationWrapper = styled.View`
  padding: ${(props) => props.theme.space[0]};
  margin-top: -30%;
`;

export const WelcomeGif = styled(Gif)`
  width: 250px;
  height: 250px;
`;
