import React, { useEffect, useState, useCallback } from "react";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { DetailsContainer, Loading } from "./restaurant-details.styles";
import { getDistance } from "../../helpers/get-distance/get-distance.helper";
import { RestaurantMenu } from "../../components/restaurant-menu/restaurant-menu.component";
import {
  getDataFromDatabase,
  getUserData,
} from "../../services/firebase/firebase-config.service";

export const RestaurantDetailsScreen = ({ route }) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const { restaurant } = route.params;
  const { place_id } = restaurant;

  const [distance, setDistance] = useState("");

  const fetchData = useCallback(async () => {
    const userAddress = await getUserData("address");
    try {
      setDistance(
        await getDistance(
          `(${userAddress.city}+${userAddress.street})`
            .split(/[\s,-]+/)
            .join("+"),
          restaurant.address.split(/[\s,-]+/).join("+")
        )
      );
    } catch (err) {
      console.log(err);
    }
  }, [restaurant.address]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getDataFromDatabase(
          "menu",
          place_id.slice(0, -2),
          place_id
        );
        setRestaurantMenu(menu);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMenu();
    fetchData();
  }, [place_id, fetchData]);

  if (restaurantMenu) {
    return (
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} distance={distance} />
        <DetailsContainer>
          <RestaurantMenu
            menu={restaurantMenu.restaurant_menu}
            id={restaurantMenu.place_id}
            restaurantObject={restaurant}
          />
        </DetailsContainer>
      </SafeArea>
    );
  } else {
    return (
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} distance={distance} />
        <DetailsContainer>
          <Loading />
        </DetailsContainer>
      </SafeArea>
    );
  }
};
