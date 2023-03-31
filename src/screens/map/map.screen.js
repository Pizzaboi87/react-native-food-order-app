import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { theme } from "../../infrastructure/theme";
import { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../../services/location/location.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerMap } from "../../components/search/search.styles";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import {
  Map,
  MapContainer,
  Item,
  CompactImage,
  CompactWebView,
  Name,
} from "./map.styles";

const isAndroid = Platform.OS === "android";
const Image = isAndroid ? CompactWebView : CompactImage;

const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { viewPort, lat, lng } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewPort.northeast.lat;
    const southwestLat = viewPort.southwest.lat;

    const newLatDelta = northeastLat - southwestLat;
    setLatDelta(newLatDelta);
  }, [location, viewPort]);

  useLoadImage(uid);

  return (
    <MapContainer>
      <SearchContainerMap>
        <Search icon="map" />
        <AvatarImage size={55} />
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
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: restaurant,
                  })
                }
              >
                <Item>
                  <Image source={{ uri: restaurant.photo }} />
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

export const MapScreen = ({ navigation }) => {
  const { error } = useContext(LocationContext);
  if (error) {
    return (
      <MapContainer>
        <SearchContainerMap>
          <Search icon="map" />
          <AvatarImage size={55} />
        </SearchContainerMap>
        <Map
          region={{
            latitude: 0,
            longitude: 0,
          }}
        />
      </MapContainer>
    );
  } else {
    return <RestaurantMap navigation={navigation} />;
  }
};
