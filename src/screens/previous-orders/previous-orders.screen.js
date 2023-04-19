import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getUserData } from "../../services/firebase/firebase-config.service";
import { OrderCard } from "../../components/order-card/order-card.component";
import { FadeInView } from "../../animations/fade.animation";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import * as Gif from "../../helpers/gif-plus-text/gif-plus-text.helper";
import * as Style from "./previous-orders.styles";
import { Loading } from "../cart/cart.styles";

export const PreviousOrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState({});
  const [orderError, setOrderError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const orderData = await getUserData("orderHistory");
        setOrders(orderData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setOrderError(true);
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeArea>
      {isLoading ? (
        <Style.LoadContainer>
          <Loading />
        </Style.LoadContainer>
      ) : orderError || !orders?.length ? (
        <Gif.Container>
          <FadeInView>
            <Gif.Title>No Order History</Gif.Title>
            <Gif.Picture source={require("../../../assets/error.gif")} />
            <Gif.Message>You didn't order anything yet.</Gif.Message>
          </FadeInView>
        </Gif.Container>
      ) : (
        <ScrollView>
          <Style.Title>Order History</Style.Title>
          {orders.map((item) => (
            <OrderCard
              key={item.time}
              amount={item.amount}
              cart={item.cart}
              time={item.time}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      )}
    </SafeArea>
  );
};
