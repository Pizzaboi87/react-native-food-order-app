import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../services/cart/cart.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { Button, Card } from "react-native-paper";
import { FadeInView } from "../../animations/fade.animation";
import {
  getDataFromDatabase,
  getUserData,
} from "../../services/firebase/firebase-config.service";
import {
  Gif,
  GifContainer,
  GifMessage,
} from "../../helpers/gif-plus-text/gif-plus-text.helper";
import {
  AvatarContainer,
  HeaderContainer,
  MainTitle,
  Loading,
  OrderContainer,
  PlusIcon,
  MinusIcon,
  OrderCard,
  OrderTitle,
  OrderTextBold,
  OrderText,
  HorizontalLine,
  PaymentButton,
  OrderDetailsContainer,
  OrderProduct,
  OrderQuantity,
  OrderPrice,
  OrderTotal,
} from "./cart.styles";

export const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [userPersonalData, setUserPersonalData] = useState({});
  let fullPrice = 0;

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

  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

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
      <HeaderContainer>
        <MainTitle>Your Order</MainTitle>
        <AvatarContainer onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </AvatarContainer>
      </HeaderContainer>
      {!cart.length ? (
        <GifContainer>
          <FadeInView>
            <Gif source={require("../../../assets/noorder.gif")} />
            <GifMessage variant="error">Your cart is still empty.</GifMessage>
          </FadeInView>
        </GifContainer>
      ) : isLoading ? (
        <Loading />
      ) : (
        <OrderContainer>
          <OrderCard onPress={() => openDetails(restaurant)}>
            <OrderTitle title="Restaurant" />
            <Card.Content>
              <OrderText>{restaurant.name}</OrderText>
              <OrderText>{restaurant.address}</OrderText>
            </Card.Content>
          </OrderCard>
          <OrderCard>
            <OrderTitle title="Order" />
            <Card.Content>
              {cart.map((item, index) => {
                const { product, quantity, price } = item.order;
                const partPrice = price * quantity;
                fullPrice += partPrice;

                return (
                  <OrderDetailsContainer key={`${product}-${price}`}>
                    <OrderProduct>
                      <OrderText>{product}</OrderText>
                    </OrderProduct>
                    <OrderQuantity>
                      <MinusIcon onPress={() => minus(index)} />
                      <OrderText>{quantity}</OrderText>
                      <PlusIcon onPress={() => plus(index)} />
                    </OrderQuantity>
                    <OrderPrice>
                      <OrderTextBold>{partPrice}€</OrderTextBold>
                    </OrderPrice>
                  </OrderDetailsContainer>
                );
              })}
              <HorizontalLine />
              <OrderTotal>
                <OrderTextBold>Total:</OrderTextBold>
                <OrderTextBold>{fullPrice}€</OrderTextBold>
              </OrderTotal>
            </Card.Content>
          </OrderCard>
          <OrderCard>
            <OrderTitle title="Delivery Address" />
            <Card.Content>
              <OrderText>
                {userPersonalData.firstName} {userPersonalData.lastName}
              </OrderText>
              <OrderText>
                {userAddress.street} {userAddress.number}. {userAddress.floor}/
                {userAddress.door}
              </OrderText>
              <OrderText>{userAddress.city}</OrderText>
              <OrderText>{userPersonalData.phone}</OrderText>
              <Button onPress={() => navigation.navigate("Change Address")}>
                Change Address
              </Button>
            </Card.Content>
          </OrderCard>
          <PaymentButton>Continue To Payment</PaymentButton>
        </OrderContainer>
      )}
    </SafeArea>
  );
};
