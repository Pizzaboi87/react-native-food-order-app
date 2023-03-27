import React, { useContext, useState } from "react";
import {
  IndicatorContainer,
  Loading,
  ErrorMessage,
  ErrorImage,
} from "./restaurants.styles";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { LocationContext } from "../../services/location/location.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { FavouritesBar } from "../../components/favourites-bar/favourites-bar.component";
import { ListOfRestaurants } from "../../components/restaurant-list/restaurant-list.component";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const [isToggled, setIsToggled] = useState(false);

  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search
          icon="heart"
          onToggle={() => setIsToggled(!isToggled)}
          isToggled={isToggled}
        />
      </SearchContainerRestaurant>
      {isToggled && <FavouritesBar onDetail={openDetails} />}
      {isLoading ? (
        <IndicatorContainer>
          <Loading />
        </IndicatorContainer>
      ) : !!error || !!locationError ? (
        <>
          <ErrorMessage variant="error">
            Oops... Something went wrong.
          </ErrorMessage>
          <ErrorImage source={require("../../../assets/error.png")} />
        </>
      ) : (
        <ListOfRestaurants navigation={navigation} data={restaurants} />
      )}
    </SafeArea>
  );
};
