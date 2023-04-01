import React, { useState } from "react";
import { menuMocks } from "../../mock/menu-data";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import {
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import {
  DetailsContainer,
  FoodContainer,
  FoodText,
  createIcon,
  ListTitle,
} from "./restaurant-details.styles";

export const RestaurantDetailsScreen = ({ route }) => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [menuStates, setMenuStates] = useState({});
  const { restaurant } = route.params;

  const mockSelector = restaurant.place_id.slice(0, -2);
  const cityMenu = menuMocks[mockSelector];
  const menuObject = cityMenu.filter(
    (menu) => menu.place_id === restaurant.place_id
  );
  const restaurantMenu = menuObject[0].restaurant_menu;

  const handlePress = (title) => {
    const isExpanded = menuStates[title] || false;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMenuStates({ ...menuStates, [title]: !isExpanded });
  };

  const list = restaurantMenu.map((item) => {
    const title = item.title;
    const expanded = menuStates[title] || false;
    return (
      <ListTitle
        key={`${item.icon} - ${item.menu[0][1]}`}
        title={title}
        left={createIcon(`${item.icon}`)}
        expanded={expanded}
        onPress={() => handlePress(title)}
      >
        {item.menu.map((food) => {
          return (
            <TouchableOpacity key={`${food[0]} - ${food[1]}`}>
              <FoodContainer>
                <FoodText variant="lightCaption">{food[0]}</FoodText>
                <FoodText variant="lightCaption">{food[1]} €</FoodText>
              </FoodContainer>
            </TouchableOpacity>
          );
        })}
      </ListTitle>
    );
  });

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <DetailsContainer>{list}</DetailsContainer>
    </SafeArea>
  );
};
