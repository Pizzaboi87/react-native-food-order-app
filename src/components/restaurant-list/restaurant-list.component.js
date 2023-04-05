import React from "react";
import { RestaurantList } from "./restaurant-list.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RestaurantInfoCard } from "../restaurant-info-card/restaurant-info-card.component";

export const ListOfRestaurants = ({ navigation, data }) => {
  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

  return (
    <RestaurantList
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => openDetails(item)}
            activeOpacity={0.8}
          >
            <RestaurantInfoCard restaurant={item} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.name}
    />
  );
};
