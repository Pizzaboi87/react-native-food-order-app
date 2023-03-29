import React, { useState } from "react";
import { List } from "react-native-paper";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import {
  DetailsContainer,
  ListTitle,
  createIcon,
  BreakfastIcon,
  LunchIcon,
  DinnerIcon,
  DrinksIcon,
} from "./restaurant-details.styles";

export const RestaurantDetailsScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { restaurant } = route.params;

  const breakfast = createIcon(BreakfastIcon);
  const lunch = createIcon(LunchIcon);
  const dinner = createIcon(DinnerIcon);
  const drinks = createIcon(DrinksIcon);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <DetailsContainer>
        <ListTitle
          title="Breakfast"
          left={breakfast}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
          <List.Item title="Ham & Eggs" />
          <List.Item title="Greek Breakfast" />
        </ListTitle>

        <ListTitle
          title="Lunch"
          left={lunch}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
          <List.Item title="Mangalica Burger w/ French Fries" />
        </ListTitle>

        <ListTitle
          title="Dinner"
          left={dinner}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom" />
          <List.Item title="Steak Frites" />
          <List.Item title="Fisherman's Soup" />
        </ListTitle>

        <ListTitle
          title="Drinks"
          left={drinks}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Coca-Cola Classic" />
          <List.Item title="Coca-Cola Zero" />
          <List.Item title="Fanta" />
          <List.Item title="Sprite" />
        </ListTitle>
      </DetailsContainer>
    </SafeArea>
  );
};
