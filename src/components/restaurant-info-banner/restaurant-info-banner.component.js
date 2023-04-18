import React, { useEffect, useState } from "react";
import star from "../../../assets/star";
import open from "../../../assets/open";
import close from "../../../assets/close";
import { TouchableOpacity } from "react-native";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
import { StyledText } from "../../helpers/typography/text.helper";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";
import { Icon, SVG } from "../restaurant-info-card/restaurant-info-card.styles";
import { Loading } from "../../screens/restaurants/restaurants.styles";
import * as Style from "./restaurant-info-banner.styles";

export const RestaurantInfoBanner = ({ id, navigation }) => {
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ratingArray, setRatingArray] = useState([]);
  const [openStatus, setOpenStatus] = useState("");

  const openDetails = () => {
    navigation.navigate("RestaurantDetail", {
      restaurant: restaurant,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRestaurant = async () => {
      try {
        await getDataFromDatabase("restaurant", id.slice(0, -2), id).then(
          (result) => {
            const openClose = getOpenStatus(result.opening_hours);
            setOpenStatus(openClose);
            setRestaurant(result);
            setRatingArray(Array.from(new Array(Math.floor(result.rating))));
          }
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchRestaurant();
  }, [id]);

  return (
    <Style.RestaurantCard>
      {isLoading ? (
        <Loading />
      ) : (
        <TouchableOpacity onPress={openDetails}>
          <Style.CardContent>
            <Style.DetailsContainer>
              <Style.DetailTextBold>{restaurant.name}</Style.DetailTextBold>
              <Style.DetailText>{restaurant.address}</Style.DetailText>
              <Style.SmallContainer>
                {ratingArray.map((_, index) => (
                  <SVG
                    xml={star}
                    key={`star-${restaurant.place_id}-${index}`}
                  />
                ))}
                <Style.DetailTextUp>
                  ({restaurant.user_ratings_total})
                </Style.DetailTextUp>
              </Style.SmallContainer>
              <Style.SmallContainer>
                {restaurant.business_status === "CLOSED_TEMPORARILY" ? (
                  <StyledText variant="error">TEMPORARILY CLOSED</StyledText>
                ) : openStatus === "open" ? (
                  <SVG xml={open} />
                ) : (
                  <SVG xml={close} />
                )}
                <Icon source={{ uri: restaurant.icon }} />
              </Style.SmallContainer>
            </Style.DetailsContainer>
            <Style.RestaurantImage source={{ uri: restaurant.photo }} />
          </Style.CardContent>
        </TouchableOpacity>
      )}
    </Style.RestaurantCard>
  );
};
