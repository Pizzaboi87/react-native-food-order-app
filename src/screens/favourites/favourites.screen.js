import React, { useContext } from "react";
import { ListOfRestaurants } from "../../components/restaurant-list/restaurant-list.component";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import { FavouritesContainer } from "./favourites.styles";
import {
  GifContainer,
  GifMessage,
  Gif,
} from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <FavouritesContainer>
      <ListOfRestaurants navigation={navigation} data={favourites} />
    </FavouritesContainer>
  ) : (
    <GifContainer>
      <Gif source={require("../../../assets/nofavourite.gif")} />
      <GifMessage variant="error">
        You don't have any favourites yet.
      </GifMessage>
    </GifContainer>
  );
};
