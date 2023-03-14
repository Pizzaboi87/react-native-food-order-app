import React from "react";
import {
  Info,
  RestaurantCard,
  RestaurantCardCover,
  Title,
  Address,
  SVG,
  Rating,
} from "./restaurant-info-card.styles";
import star from "../../../../../assets/star";

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

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Rating>
          {ratingArray.map((index) => (
            <SVG xml={star} key={index} />
          ))}
        </Rating>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
