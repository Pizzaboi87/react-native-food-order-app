import React, { useContext } from "react";
import { ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../../components/restaurants/restaurant-info-card.component";
import { RestaurantList, IndicatorContainer } from "./restaurants.styles";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { theme } from "../../infrastructure/theme";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);

  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search />
      </SearchContainerRestaurant>
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
      )}
    </SafeArea>
  );
};
