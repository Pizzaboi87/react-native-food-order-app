import styled from "styled-components/native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import { StyledText } from "../../helpers/typography/text.helper";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
`;

export const AccountCover = styled.View`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
`;

export const AnimationWrapper = styled.View`
  position: absolute;
  top: 70px;
  padding: ${(props) => props.theme.space[2]};
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.sizes[2]};
  align-items: center;
`;

export const MainTitle = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-top: ${(props) => props.theme.space[5]};
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const Title = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  margin-bottom: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  buttonColor: theme.colors.brand.primary,
  textColor: theme.colors.ui.tertiary,
  labelStyle: {
    fontSize: 18,
  },
})`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.sizes[1]};
  margin-top: ${(props) => props.theme.space[2]};
  width: 150px;
  height: 60px;
  justify-content: center;
`;

export const LoginButton = styled(AuthButton).attrs({
  icon: "lock-open-outline",
})``;

export const RegisterButton = styled(AuthButton).attrs({
  icon: "account-plus-outline",
})``;

export const BackButton = styled(AuthButton).attrs({
  buttonColor: theme.colors.ui.error,
  icon: "step-backward",
})`
  width: 140px;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 300px;
`;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 30,
})`
  margin: 0 auto;
`;

export const WelcomeGif = styled(Gif)`
  width: 250px;
  height: 250px;
`;
