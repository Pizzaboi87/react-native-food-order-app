import React, { useContext } from "react";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurants/restaurant-info-card.component";
import {
  SearchContainer,
  RestaurantList,
  IndicatorContainer,
} from "./restaurants.styles";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { theme } from "../../infrastructure/theme";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";

export const Restaurants = () => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      {isLoading ? (
        <IndicatorContainer>
          <ActivityIndicator
            animating={true}
            color={theme.colors.ui.brand}
            size={50}
          />
        </IndicatorContainer>
      ) : (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => <RestaurantInfoCard restaurant={item} />}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
