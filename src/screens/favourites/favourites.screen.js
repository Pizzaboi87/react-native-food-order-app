import React, { useContext } from "react";
import { ListOfRestaurants } from "../../components/restaurant-list/restaurant-list.component";
import { StyledText } from "../../helpers/typography/text.helper";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import {
  FavouritesContainer,
  NoFavouritesContainer,
} from "./favourites.styles";

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <FavouritesContainer>
      <ListOfRestaurants navigation={navigation} data={favourites} />
    </FavouritesContainer>
  ) : (
    <NoFavouritesContainer>
      <StyledText variant="title">No any favourites yet.</StyledText>
    </NoFavouritesContainer>
  );
};
