import React, { useContext, useEffect, useState } from "react";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { TouchableOpacity } from "react-native";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
import { LocationContext } from "../../services/location/location.context";
import { RestaurantMenu } from "../../components/restaurant-menu/restaurant-menu.component";

export const FoodSearchScreen = ({ navigation }) => {
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { keyword } = useContext(LocationContext);
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
      } catch (error) {
        console.log("error", error);
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

  const buttonList = allCategories.map((category) => {
    return (
      <Button
        mode="contained"
        icon={category.icon}
        buttonColor={selectedCategory === category ? "coral" : "grey"}
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          marginTop: 30,
        }}
      >
        {buttonList}
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        {filteredMenuItems !== null
          ? filteredMenuItems.map((item) => {
              return <RestaurantMenu menu={item} id={item[0].place_id} />;
            })
          : null}
      </ScrollView>
    </SafeArea>
  );
};
