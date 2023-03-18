import React, { useContext, useEffect, useState } from "react";
import { theme } from "../../infrastructure/theme";
import { StyledText } from "../../helpers/typography/text.helper";
import { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../services/location/location.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import {
  Map,
  MapContainer,
  Item,
  CompactImage,
  CompactWebView,
  Name,
} from "./map.styles";
import { Search } from "../../components/search/search.component";
import { SearchContainerMap } from "../../components/search/search.styles";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const Image = isAndroid ? CompactWebView : CompactImage;

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const { viewPort, lat, lng } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewPort.northeast.lat;
    const southwestLat = viewPort.southwest.lat;

    const newLatDelta = northeastLat - southwestLat;
    setLatDelta(newLatDelta);
  }, [location, viewPort]);

  return (
    <MapContainer>
      <SearchContainerMap>
        <Search icon="map" />
      </SearchContainerMap>
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              pinColor={theme.colors.ui.brand}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout>
                <Item>
                  <Image source={{ uri: restaurant.photos[0] }} />
                  <Name center variant="caption" numberOfLines={3}>
                    {restaurant.name}
                  </Name>
                </Item>
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </MapContainer>
  );
};
