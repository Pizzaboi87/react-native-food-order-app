import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "../../screens/settings/settings.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigator }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerMode: "screen",
        CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="My Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={() => null} />
    </SettingsStack.Navigator>
  );
};
