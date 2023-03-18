import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FavouriteButton } from "./favourites.styles";
import { FavouritesContext } from "../../services/favourites/favourites.context";

export const Favourite = ({ restaurant }) => {
  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);

  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite ? addFavourite(restaurant) : removeFavourite(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
