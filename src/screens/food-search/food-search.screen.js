import React, { useContext, useEffect, useState } from "react";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { TouchableOpacity } from "react-native";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getDataFromDatabase } from "../../services/firebase/firebase-config.service";
import { LocationContext } from "../../services/location/location.context";

export const FoodSearchScreen = ({ navigation }) => {
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);
  const { keyword } = useContext(LocationContext);
  const [allMenu, setAllMenu] = useState({});
  const [allCategories, setAllCategories] = useState([]);

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
        setAllMenu(menu);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMenu();
  }, [keyword]);

  useLoadImage(uid);

  const buttonList = allCategories.map((category) => {
    return (
      <Button mode="contained" icon={category.icon} buttonColor="coral">
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
    </SafeArea>
  );
};
