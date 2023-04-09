import React, { useEffect, useState } from "react";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
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
  Loading,
  DescriptionText,
  PriceText,
} from "./restaurant-details.styles";
import { FoodSelector } from "../../components/foodselector/foodselector.component";

export const RestaurantDetailsScreen = ({ route }) => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [menuStates, setMenuStates] = useState({});
  const [foodModals, setFoodModals] = useState({});
  const [quantity, setQuantity] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const { restaurant } = route.params;
  const { place_id } = restaurant;

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
  }, [place_id]);

  if (restaurantMenu) {
    const handleCategory = (title) => {
      const isExpanded = menuStates[title] || false;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMenuStates({ ...menuStates, [title]: !isExpanded });
    };

    const handleProduct = (name) => {
      const isSelected = foodModals[name] || false;
      setFoodModals({ ...foodModals, [name]: !isSelected });
    };

    const add = (name) => {
      const prevQuantity = quantity[name] || 0;
      setQuantity({ ...quantity, [name]: prevQuantity + 1 });
    };

    const remove = (name) => {
      const prevQuantity = quantity[name] || 0;
      if (quantity[name] > 0) {
        setQuantity({ ...quantity, [name]: prevQuantity - 1 });
      }
    };

    const fullfilled = (name) => {
      setQuantity({ ...quantity, [name]: 0 });
    };

    const list = restaurantMenu.restaurant_menu.map((item) => {
      const title = item.title;
      const expanded = menuStates[title] || false;
      return (
        <ListTitle
          key={`${item.icon} - ${item.menu[0].price}`}
          title={title}
          left={createIcon(`${item.icon}`)}
          expanded={expanded}
          onPress={() => handleCategory(title)}
          theme={theme}
        >
          {item.menu.map((food) => {
            const name = food.name;
            return (
              <TouchableOpacity
                onPress={() => handleProduct(name)}
                key={`${food.name} - ${food.price}`}
              >
                <FoodContainer>
                  <FoodText variant="lightCaption">{food.name}</FoodText>
                  <DescriptionText variant="lightCaption">
                    {food.description}
                  </DescriptionText>
                  <PriceText variant="lightCaption">{food.price} €</PriceText>
                </FoodContainer>
                <FoodSelector
                  visible={foodModals[name]}
                  setVisible={() => handleProduct(name)}
                  name={food.name}
                  price={food.price}
                  description={food.description}
                  id={restaurantMenu.place_id}
                  quantity={quantity[name] ? quantity[name] : 0}
                  add={() => add(food.name)}
                  remove={() => remove(food.name)}
                  fullfilled={() => fullfilled(food.name)}
                />
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
  } else {
    return (
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} />
        <DetailsContainer>
          <Loading />
        </DetailsContainer>
      </SafeArea>
    );
  }
};
