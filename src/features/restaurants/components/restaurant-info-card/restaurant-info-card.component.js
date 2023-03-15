import React from "react";
import {
  Info,
  RestaurantCard,
  RestaurantCardCover,
  Title,
  Address,
  Section,
  SVG,
  Rating,
  Closed,
  Icon,
  SectionEnd,
} from "./restaurant-info-card.styles";
import star from "../../../../../assets/star";
import open from "../../../../../assets/open";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Cake Mountain Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
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
        <Section>
          <Rating>
            {ratingArray.map(
              (item, index) => (item = <SVG xml={star} key={index} />)
            )}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily ? (
              <Closed>CLOSED TEMPORARILY</Closed>
            ) : (
              isOpenNow && <SVG xml={open} />
            )}
            <Icon source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
