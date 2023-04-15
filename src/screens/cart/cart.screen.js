import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../services/cart/cart.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { getDistance } from "../../helpers/get-distance/get-distance.helper";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
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
  GifTitle,
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
  DeliveryPrice,
  OrderTextError,
} from "./cart.styles";

export const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid, currentUser } = useContext(AuthenticationContext);

  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [userPersonalData, setUserPersonalData] = useState({});
  const [distance, setDistance] = useState("");
  const [deliveryError, setDeliveryError] = useState(false);
  const [dataError, setDataError] = useState(false);

  let fullPrice = 0;
  let delivery = 0;

  const isCorrectAddress =
    userAddress.street &&
    userAddress.number &&
    userAddress.floor &&
    userAddress.door &&
    userAddress.city;

  const isCorrectName = userPersonalData.firstName && userPersonalData.lastName;

  useLoadImage(uid);

  const fetchData = async (id) => {
    setIsLoading(true);
    const [place, personalData, address] = await Promise.all([
      getDataFromDatabase("restaurant", id.slice(0, -2), id),
      getUserData("personalData"),
      getUserData("address"),
    ]);
    if (!address && !personalData) {
      setIsLoading(false);
      setRestaurant(place);
      setDataError(true);
      setDeliveryError(true);
    } else if (!address) {
      setIsLoading(false);
      setRestaurant(place);
      setUserPersonalData(personalData);
      setDataError(true);
      setDeliveryError(true);
    } else if (!personalData) {
      setIsLoading(false);
      setRestaurant(place);
      setUserAddress(address);
      setDataError(true);
      setDeliveryError(true);
    } else {
      setRestaurant(place);
      setUserAddress(address);
      setUserPersonalData(personalData);
      setIsLoading(false);
      try {
        setDistance(
          await getDistance(
            `(${address.city}+${address.street})`.split(/[\s,-]+/).join("+"),
            place.address.split(/[\s,-]+/).join("+")
          )
        );
        setDeliveryError(false);
      } catch (err) {
        setDataError(true);
        setDeliveryError(true);
      }
    }
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

  const isTooFar = distance > 50;

  const minusQuantity = (index) => {
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

  const plusQuantity = (index) => {
    const newCart = [...cart];
    const item = newCart[index].order;
    newCart[index].order = { ...item, quantity: item.quantity + 1 };
    setCart(newCart);
  };

  const goToCheckout = (amount) => {
    navigation.navigate("Checkout", {
      amount: amount,
      userName: `${userPersonalData.firstName} ${userPersonalData.lastName}`,
      phone: userPersonalData.phone,
      address: {
        city: userAddress.city,
        line1: `${userAddress.number}. ${userAddress.floor}/${userAddress.door}`,
        postal_code: userAddress.zip,
        state: userAddress.state,
      },
      email: currentUser.email,
      uid: uid,
    });
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
            <GifTitle>Empty Cart</GifTitle>
            <Gif source={require("../../../assets/noorder.gif")} />
            <GifMessage>Your cart is still empty.</GifMessage>
          </FadeInView>
        </GifContainer>
      ) : isLoading ? (
        <Loading />
      ) : isTooFar ? (
        <GifContainer>
          <FadeInView>
            <GifTitle>Sad News...</GifTitle>
            <Gif source={require("../../../assets/sad.gif")} />
            <GifMessage>
              {"The selected restaurant\nis too far from your address."}
            </GifMessage>
          </FadeInView>
        </GifContainer>
      ) : (
        <OrderContainer>
          <DialogWindow
            variant="go"
            message={
              "Your delivery details are not valid,\nplease change them in Settings!"
            }
            visible={dataError}
            setVisible={setDataError}
          />
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
                delivery = fullPrice > 20 ? 0 : distance * 0.2;

                return (
                  <OrderDetailsContainer key={`${product}-${price}`}>
                    <OrderProduct>
                      <OrderText>{product}</OrderText>
                    </OrderProduct>
                    <OrderQuantity>
                      <MinusIcon onPress={() => minusQuantity(index)} />
                      <OrderText>{quantity}</OrderText>
                      <PlusIcon onPress={() => plusQuantity(index)} />
                    </OrderQuantity>
                    <OrderPrice>
                      <OrderTextBold>{partPrice}€</OrderTextBold>
                    </OrderPrice>
                  </OrderDetailsContainer>
                );
              })}
              <DeliveryPrice>
                <OrderTextBold>Delivery:</OrderTextBold>
                <OrderTextBold>{Number(delivery.toFixed(1))}€</OrderTextBold>
              </DeliveryPrice>
              <HorizontalLine />
              <OrderTotal>
                <OrderTextBold>Total:</OrderTextBold>
                <OrderTextBold>
                  {Number((fullPrice + delivery).toFixed(1))}€
                </OrderTextBold>
              </OrderTotal>
            </Card.Content>
          </OrderCard>
          <OrderCard>
            <OrderTitle title="Delivery Address" />
            <Card.Content>
              <OrderText>
                <OrderTextBold>Name: </OrderTextBold>
                {isCorrectName ? (
                  `${userPersonalData.firstName} ${userPersonalData.lastName}`
                ) : (
                  <OrderTextError>Missing name</OrderTextError>
                )}
              </OrderText>
              <OrderText>
                <OrderTextBold>Address: </OrderTextBold>
                {isCorrectAddress ? (
                  `${userAddress.street} ${userAddress.number}. ${userAddress.floor}/${userAddress.door}, ${userAddress.city}`
                ) : (
                  <OrderTextError>Missing address</OrderTextError>
                )}
              </OrderText>
              <OrderText>
                <OrderTextBold>Phone: </OrderTextBold>
                {userPersonalData.phone ? (
                  `${userPersonalData.phone}`
                ) : (
                  <OrderTextError>Missing phone number</OrderTextError>
                )}
              </OrderText>
              <Button onPress={() => navigation.navigate("Change Address")}>
                Change Address
              </Button>
            </Card.Content>
          </OrderCard>
          <PaymentButton
            disabled={deliveryError ? true : false}
            onPress={() => {
              const amount = Number((fullPrice + delivery).toFixed(1)) * 100;
              goToCheckout(amount);
            }}
          >
            Continue To Payment
          </PaymentButton>
        </OrderContainer>
      )}
    </SafeArea>
  );
};
