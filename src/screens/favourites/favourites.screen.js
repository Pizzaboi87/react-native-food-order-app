import React, { useContext } from "react";
import { ListOfRestaurants } from "../../components/restaurant-list/restaurant-list.component";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import { FavouritesContainer } from "./favourites.styles";
import { FadeInView } from "../../animations/fade.animation";
import * as Gif from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites?.length ? (
    <FavouritesContainer>
      <ListOfRestaurants navigation={navigation} data={favourites} />
    </FavouritesContainer>
  ) : (
    <Gif.Container>
      <FadeInView>
        <Gif.Title>No Favourites</Gif.Title>
        <Gif.Picture source={require("../../../assets/nofavourite.gif")} />
        <Gif.Message>You don't have any favourites yet.</Gif.Message>
      </FadeInView>
    </Gif.Container>
  );
};
