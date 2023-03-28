import React from "react";
import { SettingsScreen } from "../../screens/settings/settings.screen";
import { PersonalDataScreen } from "../../screens/personal-data/personal-data.screen";
import { FavouritesScreen } from "../../screens/favourites/favourites.screen";
import { ChangePictureNavigator } from "./change-picture.navigator";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { theme } from "../theme";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: theme.colors.ui.background,
        },
        CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="My Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="My Favourite Restaurants"
        component={FavouritesScreen}
      />
      <SettingsStack.Screen
        name="Personal Data"
        component={PersonalDataScreen}
      />
      <SettingsStack.Screen
        name="Change Profile Image"
        component={ChangePictureNavigator}
      />
    </SettingsStack.Navigator>
  );
};
