import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";

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

  const addFavourite = useCallback((restaurant) => {
    setFavourites((prevFavourites) => [...prevFavourites, restaurant]);
  }, []);

  const removeFavourite = useCallback((restaurant) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter(
        (favourite) => favourite.place_id !== restaurant.place_id
      )
    );
  }, []);

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
