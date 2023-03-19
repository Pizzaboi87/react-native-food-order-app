import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import { StyledText } from "../../helpers/typography/text.helper";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.sizes[1]};
  align-items: center;
`;

export const MainTitle = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const Title = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  margin-bottom: ${(props) => props.theme.space[4]};
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
  border-radius: ${(props) => props.theme.sizes[0]};
  width: 150px;
`;

export const LoginButton = styled(AuthButton).attrs({
  icon: "lock-open-outline",
})``;

export const RegisterButton = styled(AuthButton).attrs({
  icon: "account-plus-outline",
})`
  margin-top: ${(props) => props.theme.space[2]};
`;

export const BackButton = styled(AuthButton)`
  margin-top: ${(props) => props.theme.space[2]};
  width: 100px;
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
