import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Restaurants } from "../../screens/restaurants/restaurants.screen";
import { Map } from "../../screens/map/map.screen";
import { Settings } from "../../screens/settings/settings.screen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Navigator = () => {
  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
  };

  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
      headerShown: false,
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    };
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Restaurants" component={Restaurants} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
