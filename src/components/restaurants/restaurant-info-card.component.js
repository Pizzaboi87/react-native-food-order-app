import React from "react";
import { StyledText } from "../../helpers/typography/text.helper";
import star from "../../../assets/star";
import open from "../../../assets/open";
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
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant }) => {
  const {
    name = "Cake Mountain Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
    photos = [
      "https://chocolatestorras.com/wp-content/uploads/2019/06/chocolate-cake-torras-760x667.jpg",
    ],
    address = "100 Some Random Street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <View>
        <Favourite restaurant={restaurant} />
        <FadeInView>
          <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
        </FadeInView>
      </View>
      <Info>
        <StyledText variant="label">{name}</StyledText>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SVG xml={star} key={`star-${placeId}-${index}`} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily ? (
              <StyledText variant="error">CLOSED TEMPORARILY</StyledText>
            ) : (
              isOpenNow && <SVG xml={open} />
            )}
            <Icon source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <StyledText variant="lightCaption">{address}</StyledText>
      </Info>
    </RestaurantCard>
  );
};
