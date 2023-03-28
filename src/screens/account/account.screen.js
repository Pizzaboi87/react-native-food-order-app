import React from "react";
import LottieView from "lottie-react-native";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  LoginButton,
  RegisterButton,
  MainTitle,
  AnimationWrapper,
} from "./account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover>
        <AnimationWrapper>
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            source={require("../../../assets/watermelon.json")}
          />
        </AnimationWrapper>
        <MainTitle variant="label">Meals-To-Go</MainTitle>
        <AccountContainer>
          <LoginButton onPress={() => navigation.navigate("Login")}>
            sign-in
          </LoginButton>
          <RegisterButton onPress={() => navigation.navigate("Register")}>
            sign-up
          </RegisterButton>
        </AccountContainer>
      </AccountCover>
    </AccountBackground>
  );
};
