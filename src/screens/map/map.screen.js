import React, { useContext, useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { theme } from "../../infrastructure/theme";
import { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { LocationContext } from "../../services/location/location.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { RestaurantsContext } from "../../services/restaurants/restaurants.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Search } from "../../components/search/search.component";
import { SearchContainerMap } from "../../components/search/search.styles";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import * as Style from "./map.styles";
import * as Gif from "../../helpers/gif-plus-text/gif-plus-text.helper";

const isAndroid = Platform.OS === "android";
const Image = isAndroid ? Style.CompactWebView : Style.CompactImage;

export const MapScreen = ({ navigation }) => {
  const { location, error: locationError } = useContext(LocationContext);
  const { restaurants, error: restaurantError } =
    useContext(RestaurantsContext);
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { viewport, lat, lng } = location;
  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const newLatDelta = northeastLat - southwestLat;
    setLatDelta(newLatDelta);
  }, [location, viewport]);

  useLoadImage(uid);

  return (
    <Style.MapContainer>
      <SearchContainerMap>
        <Search icon="map" />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </TouchableOpacity>
      </SearchContainerMap>
      {locationError || restaurantError || !restaurants.length ? (
        <Gif.Container>
          <FadeInView>
            <Gif.Title>Search Error</Gif.Title>
            <Gif.Picture source={require("../../../assets/error.gif")} />
            <Gif.Message>
              {
                "It seems all food disappeared...\nor you tried a wrong keyword."
              }
            </Gif.Message>
          </FadeInView>
        </Gif.Container>
      ) : (
        <Style.Map
          provider={PROVIDER_GOOGLE}
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
                  <Style.Item>
                    <Image source={{ uri: restaurant.photo }} />
                    <Style.Name center variant="caption" numberOfLines={3}>
                      {restaurant.name}
                    </Style.Name>
                  </Style.Item>
                </Callout>
              </Marker>
            );
          })}
        </Style.Map>
      )}
    </Style.MapContainer>
  );
};
