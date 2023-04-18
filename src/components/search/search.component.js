import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../services/location/location.context";
import { replaceAccentedCharacters } from "../../helpers/replace-accented-characters/replace-accented-characters.helper";
import { SearchBarOrange } from "./search.styles";

export const Search = ({ icon, isToggled, onToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchBarOrange
      icon={
        icon === "map"
          ? "map"
          : icon === "search"
          ? "crosshairs"
          : isToggled
          ? "heart"
          : "heart-outline"
      }
      onIconPress={icon === "heart" ? onToggle : null}
      placeholder="Search for a location"
      value={searchKeyword}
      onSubmitEditing={() => search(replaceAccentedCharacters(searchKeyword))}
      onChangeText={(text) => setSearchKeyword(text)}
    />
  );
};
