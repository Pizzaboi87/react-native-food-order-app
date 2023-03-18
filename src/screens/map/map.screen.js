import React, { useContext } from "react";
import MapView from "react-native-maps";
import { LocationContext } from "../../services/location/location.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { Map, MapContainer } from "./map.styles";
import { Search } from "../../components/search/search.component";
import { SearchContainerMap } from "../../components/search/search.styles";

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);

  return (
    <MapContainer>
      <SearchContainerMap>
        <Search icon="map" />
      </SearchContainerMap>
      <Map>
        {restaurants.map((restaurant) => {
          return null;
        })}
      </Map>
    </MapContainer>
  );
};
