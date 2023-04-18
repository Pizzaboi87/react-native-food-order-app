import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const Background = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
`;

export const Cover = styled.View`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.sizes[2]};
  align-items: center;
`;

export const AuthButton = styled(Button).attrs({
  mode: "contained",
  buttonColor: theme.colors.brand.primary,
  textColor: theme.colors.ui.tertiary,
  labelStyle: {
    fontSize: 16,
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
