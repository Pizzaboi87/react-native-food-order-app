import React, { useState, useEffect, useContext } from "react";
import { Card, Text } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
import { CartContext } from "../../services/cart/cart.context";
import * as Style from "./order-card.styles";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";

export const OrderCard = ({ amount, cart, time, navigation }) => {
  const [restaurant, setRestaurant] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { setCart } = useContext(CartContext);

  const openDetails = () => {
    navigation.navigate("RestaurantDetail", {
      restaurant: restaurant,
    });
  };

  useEffect(() => {
    const id = cart[0].id;
    const fetchData = async (id) => {
      try {
        await getDataFromDatabase("restaurant", id.slice(0, -2), id).then(
          (result) => {
            setRestaurant(result);
            const openStatus = getOpenStatus(result.opening_hours);
            setIsOpen(
              openStatus === "open" && result.business_status === "OPERATIONAL"
            );
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData(id);
  }, []);

  return (
    <Style.OrderCard>
      <Card.Content>
        <Style.OrderView>
          <View>
            <Style.TextWithMargin>{time.slice(0, -3)}</Style.TextWithMargin>
            <Style.TextBold>
              From: <Text>{restaurant.name}</Text>
            </Style.TextBold>
            <Style.TextBold>
              Order Total: <Text>{`${amount}€`}</Text>
            </Style.TextBold>
            <View>
              <Style.TextBold>Ordered items:</Style.TextBold>
              {cart.map((history) => {
                return (
                  <Style.TextNormal
                    key={`${history.order.product}-${history.order.price}`}
                  >
                    {history.order.quantity} x {history.order.product}
                  </Style.TextNormal>
                );
              })}
            </View>
          </View>
          <TouchableOpacity onPress={openDetails}>
            <Style.RestaurantImage source={{ uri: `${restaurant.photo}` }} />
          </TouchableOpacity>
        </Style.OrderView>
        <Style.ReOrderButton
          onPress={() => setCart(cart)}
          disabled={isOpen ? false : true}
        >
          {isOpen ? "Reorder" : "Restaurant is closed."}
        </Style.ReOrderButton>
      </Card.Content>
    </Style.OrderCard>
  );
};
