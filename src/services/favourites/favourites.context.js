import React, { createContext, useState } from "react";

export const FavouritesContext = createContext();
export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const removeFavourite = (restaurant) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };
  return (
    <FavouritesContext.Provider
      value={{ favourites: favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
