import React from "react";
import { theme } from "../theme";
import { SettingsScreen } from "../../screens/settings/settings.screen";
import { FavouritesScreen } from "../../screens/favourites/favourites.screen";
import { PersonalDataScreen } from "../../screens/personal-data/personal-data.screen";
import { DeliveryAddressScreen } from "../../screens/delivery-address/delivery-address.screen";
import { PasswordChangeScreen } from "../../screens/password-change/password-change.screen";
import { PreviousOrdersScreen } from "../../screens/previous-orders/previous-orders.screen";
import { ChangePictureNavigator } from "./change-picture.navigator";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

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
        name="Previous Orders"
        component={PreviousOrdersScreen}
      />
      <SettingsStack.Screen
        name="Delivery Address"
        component={DeliveryAddressScreen}
      />
      <SettingsStack.Screen
        name="Personal Details"
        component={PersonalDataScreen}
      />
      <SettingsStack.Screen
        name="Change Profile Image"
        component={ChangePictureNavigator}
      />
      <SettingsStack.Screen
        name="Change Password"
        component={PasswordChangeScreen}
      />
    </SettingsStack.Navigator>
  );
};
