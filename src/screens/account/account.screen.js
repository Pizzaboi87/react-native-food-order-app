import React from "react";
import { View } from "react-native";
import * as Account from "../../helpers/account-styles/account-styles.helper";
import * as Style from "./account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <Account.Background>
      <Account.Cover>
        <Style.AnimationWrapper>
          <Style.WelcomeGif source={require("../../../assets/surprise.gif")} />
        </Style.AnimationWrapper>
        <View>
          <Style.MainTitle variant="label">Pizzaboi App</Style.MainTitle>
          <Account.Container>
            <Style.LoginButton onPress={() => navigation.navigate("Login")}>
              sign-in
            </Style.LoginButton>
            <Style.RegisterButton
              onPress={() => navigation.navigate("Register")}
            >
              sign-up
            </Style.RegisterButton>
          </Account.Container>
        </View>
      </Account.Cover>
    </Account.Background>
  );
};
