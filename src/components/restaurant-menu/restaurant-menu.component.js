import React, { useState } from "react";
import { theme } from "../../infrastructure/theme";
import { FoodSelector } from "../foodselector/foodselector.component";
import {
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from "react-native";
import {
  ListTitle,
  createIcon,
  FoodContainer,
  FoodText,
  DescriptionText,
  PriceText,
} from "../../screens/restaurant-details/restaurant-details.styles";
import { useEffect } from "react";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";

export const RestaurantMenu = ({ menu, id, restaurantObject }) => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [menuStates, setMenuStates] = useState({});
  const [foodModals, setFoodModals] = useState({});
  const [quantity, setQuantity] = useState({});
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!restaurantObject) {
        try {
          const data = await getDataFromDatabase(
            "restaurant",
            id.slice(0, -2),
            id
          );
          setRestaurant(data);
        } catch (error) {
          console.log(error);
        }
      } else setRestaurant(restaurantObject);
    };
    fetchRestaurant();
  }, []);

  if (restaurant) {
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

    const list = menu.map((item) => {
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
                  id={restaurant.place_id}
                  quantity={quantity[name] ? quantity[name] : 0}
                  add={() => add(food.name)}
                  remove={() => remove(food.name)}
                  fullfilled={() => fullfilled(food.name)}
                  openingHours={restaurant.opening_hours}
                  temporaryClosed={restaurant.business_status}
                />
              </TouchableOpacity>
            );
          })}
        </ListTitle>
      );
    });

    return list;
  } else return null;
};
