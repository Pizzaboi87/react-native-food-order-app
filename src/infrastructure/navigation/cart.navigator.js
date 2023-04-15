import React from "react";
import { CartScreen } from "../../screens/cart/cart.screen";
import { DeliveryAddressScreen } from "../../screens/delivery-address/delivery-address.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { theme } from "../theme";
import { CheckoutScreen } from "../../screens/checkout/checkout.screen";

const CartStack = createStackNavigator();

export const CartNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: true,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: theme.colors.ui.background,
        },
        CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <CartStack.Screen
        options={{ header: () => null }}
        name="Your Cart"
        component={CartScreen}
      />
      <CartStack.Screen
        name="Change Address"
        component={DeliveryAddressScreen}
      />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
};
