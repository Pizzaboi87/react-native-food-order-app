import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../services/location/location.context";

export const Search = ({ icon }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <Searchbar
      icon={icon === "map" ? "map" : null}
      placeholder="Search for a location"
      value={searchKeyword}
      onSubmitEditing={() => search(searchKeyword)}
      onChangeText={(text) => setSearchKeyword(text)}
    />
  );
};
