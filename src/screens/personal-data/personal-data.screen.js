import React from "react";
import { Text } from "react-native";
import { Container } from "./personal-data.styles";
import { Button } from "react-native-paper";
import { getRestaurant } from "../../services/firebase/firebase-config.service";
import { useState } from "react";

export const PersonalDataScreen = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  const handleGetRestaurant = () => {
    getRestaurant("toronto03");
  };

  return (
    <Container>
      <Text>Personal Data Screen</Text>
      <Button onPress={handleGetRestaurant}>TRY IT</Button>
      {restaurantData && <Text>{JSON.stringify(restaurantData, null, 2)}</Text>}
    </Container>
  );
};
