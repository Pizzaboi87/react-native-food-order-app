import React from "react";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { SafeArea, SearchContainer, ListContainer } from "./restaurants.styles";

export const RestaurantsScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <ListContainer>
      <RestaurantInfoCard />
    </ListContainer>
  </SafeArea>
);
