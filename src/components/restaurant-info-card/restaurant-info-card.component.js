import React from "react";
import star from "../../../assets/star";
import open from "../../../assets/open";
import closed from "../../../assets/close";
import { View } from "react-native";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";
import { StyledText } from "../../helpers/typography/text.helper";
import { Favourite } from "../favourites/favourites.component";
import { FadeInView } from "../../animations/fade.animation";
import * as Style from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant, distance, navigation }) => {
  const ratingArray = Array.from(new Array(Math.floor(restaurant.rating)));
  const result = getOpenStatus(restaurant.opening_hours);
  const isTooFar = distance > 50;

  const openDetails = () => {
    navigation.navigate("RestaurantDetail", {
      restaurant: restaurant,
    });
  };

  return (
    <Style.RestaurantCard onPress={openDetails}>
      <View>
        <Favourite restaurant={restaurant} />
        <FadeInView>
          <Style.RestaurantCardCover
            key={restaurant.place_id}
            source={{ uri: restaurant.photo }}
          />
        </FadeInView>
      </View>
      <Style.Info>
        <StyledText variant="label">{restaurant.name}</StyledText>
        <Style.Section>
          <Style.Rating>
            {ratingArray.map((_, index) => (
              <Style.SVG
                xml={star}
                key={`star-${restaurant.place_id}-${index}`}
              />
            ))}
            <Style.RatingNumber>
              ({restaurant.user_ratings_total})
            </Style.RatingNumber>
          </Style.Rating>
          <Style.SectionEnd>
            {restaurant.business_status === "CLOSED_TEMPORARILY" ? (
              <StyledText variant="error">TEMPORARILY CLOSED</StyledText>
            ) : result === "open" ? (
              <Style.SVG xml={open} />
            ) : (
              <Style.SVG xml={closed} />
            )}
            <Style.Icon source={{ uri: restaurant.icon }} />
          </Style.SectionEnd>
        </Style.Section>
        <StyledText variant="lightCaption">{restaurant.address}</StyledText>
        {distance ? (
          isTooFar ? (
            <Style.NotDeliver>Not deliver to your address.</Style.NotDeliver>
          ) : (
            <Style.DeliveryText>{`Delivery: ${Number(
              (distance * 0.2).toFixed(1)
            )}€`}</Style.DeliveryText>
          )
        ) : null}
      </Style.Info>
    </Style.RestaurantCard>
  );
};
