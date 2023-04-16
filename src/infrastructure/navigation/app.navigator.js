import React, { useContext } from "react";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { UserImageContextProvider } from "../../services/user-image/user-image.context";
import { CartContext } from "../../services/cart/cart.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FoodSearchScreen } from "../../screens/food-search/food-search.screen";
import { MapScreen } from "../../screens/map/map.screen";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { CartNavigator } from "./cart.navigator";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../theme";

const TAB_ICON = {
  Restaurants: "local-restaurant",
  Map: "map",
  Search: "search",
  Cart: "shopping-basket",
  Settings: "settings",
};

const useScreenOptions = ({ route }) => {
  const { cart } = useContext(CartContext);
  const isCart = route.name === "Cart";
  const iconName = TAB_ICON[route.name];

  const allQuantity = cart.reduce((acc, item) => {
    return acc + item.order.quantity;
  }, 0);

  return {
    tabBarIcon: ({ color }) => (
      <MaterialIcons name={iconName} size={32} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: theme.colors.ui.brand,
    tabBarInactiveTintColor: theme.colors.ui.secondary,
    tabBarBadge: isCart && cart.length > 0 ? allQuantity : null,
  };
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <UserImageContextProvider>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Tab.Navigator screenOptions={useScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Search" component={FoodSearchScreen} />
              <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{ unmountOnBlur: true }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  tabBarButton: () => null,
                  unmountOnBlur: true,
                }}
              />
            </Tab.Navigator>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </UserImageContextProvider>
  );
};
