import React from "react";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { UserImageContextProvider } from "../../services/user-image/user-image.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "../../screens/map/map.screen";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { CartContextProvider } from "../../services/cart/cart.context";

const TAB_ICON = {
  Restaurants: "local-restaurant",
  Map: "map",
  Cart: "shopping-basket",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ color }) => (
      <MaterialIcons name={iconName} size={32} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: theme.colors.ui.brand,
    tabBarInactiveTintColor: theme.colors.ui.secondary,
  };
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <UserImageContextProvider>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <CartContextProvider>
              <Tab.Navigator screenOptions={createScreenOptions}>
                <Tab.Screen
                  name="Restaurants"
                  component={RestaurantsNavigator}
                />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Cart" component={SettingsNavigator} />
                <Tab.Screen
                  name="Settings"
                  component={SettingsNavigator}
                  options={{
                    tabBarButton: () => null,
                  }}
                />
              </Tab.Navigator>
            </CartContextProvider>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </UserImageContextProvider>
  );
};
