import React from "react";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  LoginButton,
  RegisterButton,
  MainTitle,
} from "./account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover>
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
