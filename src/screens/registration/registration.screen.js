import React from "react";
import { AccountBackground, AccountCover } from "../account/account.styles";
import { View, Text } from "react-native";

export const RegistrationScreen = () => {
  return (
    <AccountBackground>
      <AccountCover />
      <Text>Registration Screen</Text>
    </AccountBackground>
  );
};
