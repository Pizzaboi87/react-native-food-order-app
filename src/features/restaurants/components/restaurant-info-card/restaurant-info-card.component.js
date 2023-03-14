import React from "react";
import {
  RestaurantCard,
  RestaurantCardCover,
  RestaurantCardTitle,
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Cake Mountain Restaurant",
    icon = ["../../../assets/icon.png"],
    photos = [
      "https://chocolatestorras.com/wp-content/uploads/2019/06/chocolate-cake-torras-760x667.jpg",
    ],
    address = "100 Some Random Street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false,
  } = restaurant;

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <RestaurantCardTitle>{name}</RestaurantCardTitle>
    </RestaurantCard>
  );
};
