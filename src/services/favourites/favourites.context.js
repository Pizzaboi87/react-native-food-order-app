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
    async (restaurant) => {
      await addFavouriteToUser(restaurant.place_id);
      const data = await getRestaurant(
        restaurant.place_id.slice(0, -2),
        restaurant.place_id
      );
      setFavourites([...favourites, data]);
    },
    [currentUser, favourites]
  );

  const removeFavourite = useCallback(
    async (restaurant) => {
      await removeFavouriteFromUser(restaurant.place_id);
      setFavourites((prevFavourites) =>
        prevFavourites.filter(
          (favourite) => favourite.place_id !== restaurant.place_id
        )
      );
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
  }, [currentUser]);

  return (
    <FavouritesContext.Provider
      value={{ favourites: favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
