import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../services/cart/cart.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { StyledText } from "../../helpers/typography/text.helper";
import {
  getDataFromDatabase,
  getUserData,
} from "../../services/firebase/firebase-config.service";
import { Button } from "react-native-paper";
import { Loading } from "../restaurant-details/restaurant-details.styles";

export const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [userPersonalData, setUserPersonalData] = useState({});

  const fetchData = async (id) => {
    setIsLoading(true);
    const [place, personalData, address] = await Promise.all([
      getDataFromDatabase("restaurant", id.slice(0, -2), id),
      getUserData("personalData"),
      getUserData("address"),
    ]);
    setRestaurant(place);
    setUserAddress(address);
    setUserPersonalData(personalData);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (cart.length) {
        const id = cart[0].id;
        fetchData(id);
      }
    });

    return unsubscribe;
  }, [navigation, cart]);

  useLoadImage(uid);

  const minus = (index) => {
    const newCart = [...cart];
    const item = newCart[index].order;
    if (item.quantity > 1) {
      newCart[index].order = { ...item, quantity: item.quantity - 1 };
      setCart(newCart);
    } else {
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const plus = (index) => {
    const newCart = [...cart];
    const item = newCart[index].order;
    newCart[index].order = { ...item, quantity: item.quantity + 1 };
    setCart(newCart);
  };

  return (
    <SafeArea>
      <View
        style={{
          paddingTop: 15,
          height: 80,
          backgroundColor: "blue",
        }}
      >
        <StyledText
          variant="title"
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          Your Order
        </StyledText>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{
            position: "absolute",
            top: 17.5,
            right: 16,
          }}
        >
          <AvatarImage size={55} />
        </TouchableOpacity>
      </View>
      {!cart.length ? (
        <Text>No any order.</Text>
      ) : isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "yellow" }}>
          <Text>Restaurant:</Text>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.address}</Text>
          <Text style={{ marginTop: 20 }}>Order:</Text>
          {cart.map((item, index) => (
            <View>
              <Button onPress={() => minus(index)}>Minus</Button>
              <Text>
                {item.order.product} - {item.order.quantity}db -{" "}
                {item.order.quantity * item.order.price} euró
              </Text>
              <Button onPress={() => plus(index)}>Plus</Button>
            </View>
          ))}
          <Text style={{ marginTop: 20 }}>Delivery Address:</Text>
          <Text>
            {userPersonalData.firstName} {userPersonalData.lastName}
          </Text>
          <Text>
            {userAddress.street} {userAddress.number}. {userAddress.floor}/
            {userAddress.door}
          </Text>
          <Text>{userAddress.city}</Text>
          <Text>{userPersonalData.phone}</Text>
          <Button onPress={() => navigation.navigate("Change Address")}>
            Change Address
          </Button>
        </ScrollView>
      )}
    </SafeArea>
  );
};
