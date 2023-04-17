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
import * as Gif from "../../helpers/gif-plus-text/gif-plus-text.helper";
import * as Style from "./cart.styles";
import {
  getDataFromDatabase,
  getUserData,
} from "../../services/firebase/firebase-config.service";

export const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid, currentUser } = useContext(AuthenticationContext);

  const [fullPrice, setFullPrice] = useState(0);
  const [delivery, setDelivery] = useState(0);
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

  const goToCheckout = () => {
    navigation.navigate("Checkout", { order: order });
  };

  useEffect(() => {
    let newFullPrice = 0;
    cart.forEach((item) => {
      const { quantity, price } = item.order;
      const partPrice = price * quantity;
      newFullPrice += partPrice;
    });
    setFullPrice(newFullPrice);
    setDelivery(newFullPrice > 20 ? 0 : order.distance * 0.2);
  }, [cart, order.distance]);

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      amount: (fullPrice + delivery).toFixed(1),
    }));
  }, [fullPrice, delivery]);

  return (
    <SafeArea>
      <Style.HeaderContainer>
        <Style.MainTitle>Your Order</Style.MainTitle>
        <Style.AvatarContainer onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </Style.AvatarContainer>
      </Style.HeaderContainer>
      {!cart.length ? (
        <Gif.Container>
          <FadeInView>
            <Gif.Title>Empty Cart</Gif.Title>
            <Gif.Picture source={require("../../../assets/noorder.gif")} />
            <Gif.Message>Your cart is still empty.</Gif.Message>
          </FadeInView>
        </Gif.Container>
      ) : status.isLoading ? (
        <Style.Loading />
      ) : isTooFar ? (
        <Gif.Container>
          <FadeInView>
            <Gif.Title>Sad News...</Gif.Title>
            <Gif.Picture source={require("../../../assets/sad.gif")} />
            <Gif.Message>
              {"The selected restaurant\nis too far from your address."}
            </Gif.Message>
          </FadeInView>
        </Gif.Container>
      ) : (
        <Style.OrderContainer>
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
          <Style.OrderCard onPress={() => openDetails(order.restaurant)}>
            <Style.OrderTitle title="Restaurant" />
            <Card.Content>
              <Style.OrderText>{order.restaurant.name}</Style.OrderText>
              <Style.OrderText>{order.restaurant.address}</Style.OrderText>
            </Card.Content>
          </Style.OrderCard>
          <Style.OrderCard>
            <Style.OrderTitle title="Order" />

            <Card.Content>
              {cart.map((item, index) => {
                const { product, quantity, price } = item.order;
                const partPrice = price * quantity;
                return (
                  <Style.OrderDetailsContainer key={`${product}-${price}`}>
                    <Style.OrderProduct>
                      <Style.OrderText>{product}</Style.OrderText>
                    </Style.OrderProduct>
                    <Style.OrderQuantity>
                      <Style.MinusIcon onPress={() => minusQuantity(index)} />
                      <Style.OrderText>{quantity}</Style.OrderText>
                      <Style.PlusIcon onPress={() => plusQuantity(index)} />
                    </Style.OrderQuantity>
                    <Style.OrderPrice>
                      <Style.OrderTextBold>{partPrice}€</Style.OrderTextBold>
                    </Style.OrderPrice>
                  </Style.OrderDetailsContainer>
                );
              })}
              <Style.DeliveryPrice>
                <Style.OrderTextBold>Delivery:</Style.OrderTextBold>
                <Style.OrderTextBold>
                  {Number(delivery.toFixed(1))}€
                </Style.OrderTextBold>
              </Style.DeliveryPrice>
              <Style.HorizontalLine />
              <Style.OrderTotal>
                <Style.OrderTextBold>Total:</Style.OrderTextBold>
                <Style.OrderTextBold>
                  {Number((fullPrice + delivery).toFixed(1))}€
                </Style.OrderTextBold>
              </Style.OrderTotal>
            </Card.Content>
          </Style.OrderCard>
          <Style.OrderCard>
            <Style.OrderTitle title="Delivery Address" />
            <Card.Content>
              <Style.OrderText>
                <Style.OrderTextBold>Name: </Style.OrderTextBold>
                {isCorrectName ? (
                  `${order.user.firstName} ${order.user.lastName}`
                ) : (
                  <Style.OrderTextError>Missing name</Style.OrderTextError>
                )}
              </Style.OrderText>
              <Style.OrderText>
                <Style.OrderTextBold>Address: </Style.OrderTextBold>
                {isCorrectAddress ? (
                  `${order.address.street} ${order.address.number}. ${order.address.floor}/${order.address.door}, ${order.address.city}`
                ) : (
                  <Style.OrderTextError>Missing address</Style.OrderTextError>
                )}
              </Style.OrderText>
              <Style.OrderText>
                <Style.OrderTextBold>Phone: </Style.OrderTextBold>
                {order.user.phone ? (
                  `${order.user.phone}`
                ) : (
                  <Style.OrderTextError>
                    Missing phone number
                  </Style.OrderTextError>
                )}
              </Style.OrderText>
              <Button onPress={() => navigation.navigate("Change Address")}>
                Change Address
              </Button>
            </Card.Content>
          </Style.OrderCard>
          <Style.PaymentButton
            disabled={status.dataError ? true : false}
            onPress={goToCheckout}
          >
            Continue To Payment
          </Style.PaymentButton>
        </Style.OrderContainer>
      )}
    </SafeArea>
  );
};
