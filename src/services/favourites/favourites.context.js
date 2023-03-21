import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (error) {
      console.log("error while saving", error);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (error) {
      console.log("error while loading", error);
    }
  };

  const addFavourite = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const removeFavourite = (restaurant) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.placeId !== restaurant.placeId
    );
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (currentUser) {
      loadFavourites(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      saveFavourites(favourites, currentUser.uid);
    }
  }, [favourites, currentUser]);

  return (
    <FavouritesContext.Provider
      value={{ favourites: favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
