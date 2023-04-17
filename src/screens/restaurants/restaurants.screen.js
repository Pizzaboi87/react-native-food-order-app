import React, { useContext, useState, useEffect } from "react";
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
import { IndicatorContainer, Loading } from "./restaurants.styles";
import { FadeInView } from "../../animations/fade.animation";
import { TouchableOpacity } from "react-native";
import * as Gif from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const { uid } = useContext(AuthenticationContext);
  const { useLoadImage } = useContext(UserImageContext);
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openDetails = (item) => {
    navigation.navigate("RestaurantDetail", {
      restaurant: item,
    });
  };

  useLoadImage(uid);

  useEffect(() => {
    setIsLoading(true);
    if (restaurants.length) {
      setIsLoading(false);
    }
  }, [restaurants]);

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search
          icon="heart"
          onToggle={() => setIsToggled(!isToggled)}
          isToggled={isToggled}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </TouchableOpacity>
      </SearchContainerRestaurant>
      {isToggled && <FavouritesBar onDetail={openDetails} />}
      {isLoading ? (
        <IndicatorContainer>
          <Loading />
        </IndicatorContainer>
      ) : !!error || !!locationError ? (
        <Gif.Container>
          <FadeInView>
            <Gif.Title>Search Error</Gif.Title>
            <Gif.Image source={require("../../../assets/error.gif")} />
            <Gif.Message>
              {
                "It seems all food disappeared...\nor you tried a wrong keyword."
              }
            </Gif.Message>
          </FadeInView>
        </Gif.Container>
      ) : (
        <ListOfRestaurants navigation={navigation} data={restaurants} />
      )}
    </SafeArea>
  );
};
