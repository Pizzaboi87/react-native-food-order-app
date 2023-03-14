import React from "react";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { Container, Search, ListContainer } from "./restaurants.styles";
import { StatusBar, Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const android = `${StatusBar.currentHeight}px`;
const ios = 0;

export const RestaurantsScreen = () => (
  <Container device={isAndroid ? android : ios}>
    <Search>
      <Searchbar />
    </Search>
    <ListContainer>
      <RestaurantInfoCard />
    </ListContainer>
  </Container>
);
