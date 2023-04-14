import React, { useContext } from "react";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Search } from "../../components/search/search.component";
import { SearchContainerRestaurant } from "../../components/search/search.styles";
import { TouchableOpacity } from "react-native";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FoodSearchScreen = ({ navigation }) => {
  const { useLoadImage } = useContext(UserImageContext);
  const { uid } = useContext(AuthenticationContext);

  useLoadImage(uid);

  return (
    <SafeArea>
      <SearchContainerRestaurant>
        <Search icon="search" />
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AvatarImage size={55} />
        </TouchableOpacity>
      </SearchContainerRestaurant>
      <View>
        <Text>Food Search Screen</Text>
      </View>
    </SafeArea>
  );
};
