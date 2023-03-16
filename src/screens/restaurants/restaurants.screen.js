import React, { useContext } from "react";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurants/restaurant-info-card.component";
import { RestaurantList, IndicatorContainer } from "./restaurants.styles";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { theme } from "../../infrastructure/theme";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { Search } from "../../components/search/search.component";

export const Restaurants = () => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      <Search />
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
