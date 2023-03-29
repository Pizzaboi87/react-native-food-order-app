import React from "react";
import { View } from "react-native";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  LoginButton,
  RegisterButton,
  MainTitle,
  AnimationWrapper,
  WelcomeGif,
} from "./account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover>
        <AnimationWrapper>
          <WelcomeGif source={require("../../../assets/surprise.gif")} />
        </AnimationWrapper>
        <View>
          <MainTitle variant="label">Meals-To-Go</MainTitle>
          <AccountContainer>
            <LoginButton onPress={() => navigation.navigate("Login")}>
              sign-in
            </LoginButton>
            <RegisterButton onPress={() => navigation.navigate("Register")}>
              sign-up
            </RegisterButton>
          </AccountContainer>
        </View>
      </AccountCover>
    </AccountBackground>
  );
};
