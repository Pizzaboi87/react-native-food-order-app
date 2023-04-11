import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../screens/account/account.screen";
import { LoginScreen } from "../../screens/login/login.screen";
import { RegistrationScreen } from "../../screens/registration/registration.screen";
import { PasswordResetScreen } from "../../screens/password-reset/password-reset.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={AccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="Reset" component={PasswordResetScreen} />
    </Stack.Navigator>
  );
};
