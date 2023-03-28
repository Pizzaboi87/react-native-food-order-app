import React, { useContext, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { LocationContext } from "../../services/location/location.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { FavouritesBar } from "../../components/favourites-bar/favourites-bar.component";
import { ListOfRestaurants } from "../../components/restaurant-list/restaurant-list.component";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import {
  IndicatorContainer,
  Loading,
  ErrorMessage,
  ErrorImage,
} from "./restaurants.styles";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const { uid } = useContext(AuthenticationContext);
  const { loadImage } = useContext(UserImageContext);
  const [isToggled, setIsToggled] = useState(false);

  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const getProfilePicture = async (user) => {
        await loadImage(user);
      };
      getProfilePicture(uid);
    }, [uid, loadImage])
  );

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search
          icon="heart"
          onToggle={() => setIsToggled(!isToggled)}
          isToggled={isToggled}
        />
        <AvatarImage size={55} />
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
