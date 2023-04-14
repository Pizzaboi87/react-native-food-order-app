import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { Search } from "../../components/search/search.component";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { RestaurantMenu } from "../../components/restaurant-menu/restaurant-menu.component";
import { RestaurantInfoBanner } from "../../components/restaurant-info-banner/restaurant-info-banner.component";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { LocationContext } from "../../services/location/location.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { ButtonContainer } from "./food-search.styles";
import { theme } from "../../infrastructure/theme";
import { FadeInView } from "../../animations/fade.animation";
import {
  GifContainer,
  GifMessage,
  GifTitle,
  Gif,
} from "../../helpers/gif-plus-text/gif-plus-text.helper";

export const FoodSearchScreen = ({ navigation }) => {
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { keyword } = useContext(LocationContext);
  const [error, setError] = useState(false);
  const [allMenu, setAllMenu] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState(null);

  useLoadImage(uid);

  const handlePress = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setError(false);
        const menu = await getDataFromDatabase(
          "menu",
          keyword.toLowerCase(),
          ""
        );

        const iconSet = new Set();
        const titleSet = new Set();
        const iconTitlePairs = [];
        const restaurants = [];

        Object.keys(menu).forEach((placeKey) => {
          const place = menu[placeKey];
          Object.keys(place).forEach((menuKeys) => {
            const restaurantMenu = place[menuKeys];
            Object.keys(restaurantMenu).forEach((categoryKeys) => {
              const categories = restaurantMenu[categoryKeys];
              const { icon, title } = categories;
              if (
                !iconSet.has(icon) &&
                icon !== undefined &&
                title !== undefined
              ) {
                iconSet.add(icon);
                titleSet.add(title);
                iconTitlePairs.push({ icon, title });
              }
            });
          });
        });
        setAllCategories(iconTitlePairs);
        setSelectedCategory(iconTitlePairs[0]);

        Object.keys(menu).forEach((place) => {
          const restaurant = menu[place];
          restaurants.push(restaurant);
        });
        setAllMenu(restaurants);
      } catch (err) {
        console.log("error", err);
        setError(true);
      }
    };
    fetchMenu();

    return () => {
      return null;
    };
  }, [keyword]);

  useEffect(() => {
    if (allMenu.length) {
      const filteredMenu = allMenu
        .map((menu) => {
          return menu.restaurant_menu
            .filter((restMenu) => restMenu.title === selectedCategory.title)
            .map((restMenu) => ({
              place_id: menu.place_id,
              ...restMenu,
            }));
        })
        .filter((menu) => menu.length > 0);
      setFilteredMenuItems(filteredMenu);
    }
    return () => {
      return null;
    };
  }, [selectedCategory, allMenu]);

  const buttonList = allCategories.map((category, index) => {
    return (
      <Button
        key={`${category.icon}-${category.title}-${index}`}
        mode="contained"
        icon={category.icon}
        buttonColor={
          selectedCategory === category
            ? theme.colors.ui.brand
            : theme.colors.ui.secondary
        }
        onPress={() => handlePress(category)}
      >
        {category.title}
      </Button>
    );
  });

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search icon="search" />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </TouchableOpacity>
      </SearchContainerRestaurant>
      {error ? (
        <GifContainer>
          <FadeInView>
            <GifTitle>Search Error</GifTitle>
            <Gif source={require("../../../assets/error.gif")} />
            <GifMessage>
              {
                "It seems all food disappeared...\nor you tried a wrong keyword."
              }
            </GifMessage>
          </FadeInView>
        </GifContainer>
      ) : (
        <ScrollView>
          <ButtonContainer>{buttonList}</ButtonContainer>
          {filteredMenuItems !== null
            ? filteredMenuItems.map((item, index) => {
                return (
                  <View key={`${item.place_id}-${index}`}>
                    <RestaurantInfoBanner
                      id={item[0].place_id}
                      navigation={navigation}
                    />
                    <RestaurantMenu menu={item} id={item[0].place_id} />
                  </View>
                );
              })
            : null}
        </ScrollView>
      )}
    </SafeArea>
  );
};
