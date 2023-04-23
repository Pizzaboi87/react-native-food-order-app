import React from "react";
import { RestaurantList } from "./restaurant-list.styles";
import { RestaurantInfoCard } from "../restaurant-info-card/restaurant-info-card.component";

export const ListOfRestaurants = ({ navigation, data }) => {
  return (
    <RestaurantList
      data={data}
      renderItem={({ item }) => {
        return (
          <RestaurantInfoCard
            restaurant={item}
            navigation={navigation}
            key={item.name}
          />
        );
      }}
      keyExtractor={(item) => item.name}
    />
  );
};
