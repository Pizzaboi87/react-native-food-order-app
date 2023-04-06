import React, { useState, createContext, useEffect } from "react";
import { getDataFromDatabase } from "../firebase/firebase-config.service";

export const LocationContext = createContext();
export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("Kisvarda");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const locationRequest = async (searchTerm) => {
    const coordinateObject = await getDataFromDatabase(
      "coordinates",
      `${searchTerm}`,
      ""
    );
    return coordinateObject;
  };

  const locationTransform = (result) => {
    const { viewport } = result;
    const { lat, lng } = result.location;
    return { lat, lng, viewport };
  };

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    if (!keyword) {
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setError(null);
        setLocation(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ isLoading, error, location, search: onSearch, keyword }}
    >
      {children}
    </LocationContext.Provider>
  );
};
