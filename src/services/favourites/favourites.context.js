import { AuthenticationContext } from "../authentication/authentication.context";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import {
  addFavouriteToUser,
  getRestaurant,
  getUserData,
  removeFavouriteFromUser,
} from "../firebase/firebase-config.service";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const addFavourite = useCallback(
    (restaurant) => {
      addFavouriteToUser(restaurant.place_id);
    },
    [currentUser]
  );

  const removeFavourite = useCallback(
    (restaurant) => {
      removeFavouriteFromUser(restaurant.place_id);
    },
    [currentUser]
  );

  useEffect(() => {
    const fetchFavourites = async () => {
      if (currentUser) {
        const userData = await getUserData("favourites");
        if (userData.length) {
          const filteredRestaurants = [];
          for (const element of userData) {
            try {
              const data = await getRestaurant(element.slice(0, -2), element);
              filteredRestaurants.push(data);
            } catch (error) {
              console.error(error);
            }
          }
          setFavourites(filteredRestaurants);
        }
      }
    };
    fetchFavourites();
  }, [currentUser, favourites]);

  return (
    <FavouritesContext.Provider
      value={{ favourites: favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
