import React from "react";
import star from "../../../assets/star";
import open from "../../../assets/open";
import closed from "../../../assets/close";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";
import { StyledText } from "../../helpers/typography/text.helper";
import { View } from "react-native";
import { Favourite } from "../favourites/favourites.component";
import { FadeInView } from "../../animations/fade.animation";
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  SVG,
  RatingNumber,
  DeliveryText,
  NotDeliver,
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant, distance }) => {
  const ratingArray = Array.from(new Array(Math.floor(restaurant.rating)));
  const result = getOpenStatus(restaurant.opening_hours);
  const isTooFar = distance > 50;

  return (
    <RestaurantCard>
      <View>
        <Favourite restaurant={restaurant} />
        <FadeInView>
          <RestaurantCardCover
            key={restaurant.place_id}
            source={{ uri: restaurant.photo }}
          />
        </FadeInView>
      </View>
      <Info>
        <StyledText variant="label">{restaurant.name}</StyledText>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SVG xml={star} key={`star-${restaurant.place_id}-${index}`} />
            ))}
            <RatingNumber>({restaurant.user_ratings_total})</RatingNumber>
          </Rating>
          <SectionEnd>
            {restaurant.business_status === "CLOSED_TEMPORARILY" ? (
              <StyledText variant="error">TEMPORARILY CLOSED</StyledText>
            ) : result === "open" ? (
              <SVG xml={open} />
            ) : (
              <SVG xml={closed} />
            )}
            <Icon source={{ uri: restaurant.icon }} />
          </SectionEnd>
        </Section>
        <StyledText variant="lightCaption">{restaurant.address}</StyledText>
        {distance ? (
          isTooFar ? (
            <NotDeliver>Not deliver to your address.</NotDeliver>
          ) : (
            <DeliveryText>{`Delivery: ${Number(
              (distance * 0.2).toFixed(1)
            )}€`}</DeliveryText>
          )
        ) : null}
      </Info>
    </RestaurantCard>
  );
};
