import React from "react";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurants/restaurant-info-card.component";
import { SearchContainer, RestaurantList } from "./restaurants.styles";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";

export const Restaurants = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <RestaurantList
      data={[
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
        { name: 10 },
        { name: 11 },
        { name: 12 },
        { name: 13 },
        { name: 14 },
      ]}
      renderItem={() => <RestaurantInfoCard />}
      keyExtractor={(item) => item.name}
    />
  </SafeArea>
);
