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

  const [order, setOrder] = useState({
    currentUser: currentUser,
    restaurant: {},
    address: {},
    user: {},
    uid: uid,
    distance: 0,
    amount: 0,
  });
  const [status, setStatus] = useState({
    isLoading: false,
    dataError: false,
    showError: false,
  });

  let fullPrice = 0;
  let delivery = 0;

  const isTooFar = order.distance > 50;
  const isCorrectName = order.user.firstName && order.user.lastName;
  const isCorrectAddress =
    order.address.street &&
    order.address.number &&
    order.address.floor &&
    order.address.door &&
    order.address.city;

  useLoadImage(uid);

  const fetchData = async (id) => {
    setStatus({ isLoading: true, dataError: false, showError: false });
    const [place, personalData, address] = await Promise.all([
      getDataFromDatabase("restaurant", id.slice(0, -2), id),
      getUserData("personalData"),
      getUserData("address"),
    ]);

    if (place) {
      setOrder((prevOrder) => ({ ...prevOrder, restaurant: place }));
      if (personalData && address) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          address: address,
          user: personalData,
        }));
        try {
          const formattedAddress = `${address.city}+${address.street}`
            .split(/[\s,-]+/)
            .join("+");
          const formattedRestaurantAddress = place.address
            .split(/[\s,-]+/)
            .join("+");
          const distance = await getDistance(
            formattedAddress,
            formattedRestaurantAddress
          );
          setOrder((prevOrder) => ({
            ...prevOrder,
            distance: distance,
          }));
          setStatus({ ...status, isLoading: false });
        } catch (err) {
          setStatus({ ...status, dataError: true, showError: true });
        }
      } else if (personalData && !address) {
        setOrder((prevOrder) => ({ ...prevOrder, user: personalData }));
        setStatus({ isLoading: false, dataError: true, showError: true });
      } else if (address && !personalData) {
        setOrder((prevOrder) => ({ ...prevOrder, address: address }));
        setStatus({ isLoading: false, dataError: true, showError: true });
      } else {
        setStatus({ isLoading: false, dataError: true, showError: true });
      }
    } else {
      setStatus({ isLoading: false, dataError: true, showError: true });
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
    setOrder((prevOrder) => ({ ...prevOrder, amount: amount }));
    navigation.navigate("Checkout", { order: order });
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
      ) : status.isLoading ? (
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
            visible={status.showError}
            setVisible={() =>
              setStatus((prevVisible) => ({ ...prevVisible, showError: false }))
            }
          />
          <OrderCard onPress={() => openDetails(order.restaurant)}>
            <OrderTitle title="Restaurant" />
            <Card.Content>
              <OrderText>{order.restaurant.name}</OrderText>
              <OrderText>{order.restaurant.address}</OrderText>
            </Card.Content>
          </OrderCard>
          <OrderCard>
            <OrderTitle title="Order" />

            <Card.Content>
              {cart.map((item, index) => {
                const { product, quantity, price } = item.order;
                const partPrice = price * quantity;
                fullPrice += partPrice;
                delivery = fullPrice > 20 ? 0 : order.distance * 0.2;

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
                  `${order.user.firstName} ${order.user.lastName}`
                ) : (
                  <OrderTextError>Missing name</OrderTextError>
                )}
              </OrderText>
              <OrderText>
                <OrderTextBold>Address: </OrderTextBold>
                {isCorrectAddress ? (
                  `${order.address.street} ${order.address.number}. ${order.address.floor}/${order.address.door}, ${order.address.city}`
                ) : (
                  <OrderTextError>Missing address</OrderTextError>
                )}
              </OrderText>
              <OrderText>
                <OrderTextBold>Phone: </OrderTextBold>
                {order.user.phone ? (
                  `${order.user.phone}`
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
            disabled={status.dataError ? true : false}
            onPress={() => {
              const amount = Number((fullPrice + delivery).toFixed(1));
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
