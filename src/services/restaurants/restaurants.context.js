import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import {
  findBranchByValue,
  getDataFromDatabase,
} from "../firebase/firebase-config.service";

export const RestaurantsContext = createContext();
export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const restaurantsRequest = async (location) => {
    const cityName = await findBranchByValue(location.lat);
    const searchableCityName = cityName.split(" ").join("_");
    try {
      const restaurantArray = [];
      const allRestaurant = await getDataFromDatabase(
        "restaurant",
        `${searchableCityName}`,
        ""
      );
      Object.keys(allRestaurant).forEach((key) => {
        restaurantArray.push(allRestaurant[key]);
      });
      return restaurantArray;
    } catch (error) {
      console.log("error", error);
    }
  };

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    restaurantsRequest(loc)
      .then((results) => {
        setError(null);
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    retrieveRestaurants(location);
  }, [location]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
