import React, { useContext } from "react";
import { theme } from "../../infrastructure/theme";
import { AntDesign } from "@expo/vector-icons";
import { FavouriteButton } from "./favourites.styles";
import { FavouritesContext } from "../../services/favourites/favourites.context";

export const Favourite = ({ restaurant }) => {
  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);
  const colorFav = theme.colors.ui.brand;
  const colorNotFav = theme.colors.ui.tertiary;

  const isFavourite = favourites.find(
    (r) => r.place_id === restaurant.place_id
  );

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite ? addFavourite(restaurant) : removeFavourite(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? colorFav : colorNotFav}
      />
    </FavouriteButton>
  );
};
