import React, { useContext, useCallback } from "react";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, TouchableOpacity } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { FadeInView } from "../../animations/fade.animation";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import {
  createIcon,
  SettingsItem,
  AvatarContainer,
  HeartIcon,
  DoorIcon,
  UserText,
  AddressIcon,
  PersonalIcon,
  OrdersIcon,
} from "./settings.styles";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser, uid } = useContext(AuthenticationContext);
  const { loadImage } = useContext(UserImageContext);

  const heartIcon = createIcon(HeartIcon);
  const doorIcon = createIcon(DoorIcon);
  const personalIcon = createIcon(PersonalIcon);
  const addressIcon = createIcon(AddressIcon);
  const ordersIcon = createIcon(OrdersIcon);

  useFocusEffect(
    useCallback(() => {
      const getProfilePicture = async (user) => {
        await loadImage(user);
      };
      getProfilePicture(uid);
    }, [uid, loadImage])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Profile Image")}
          >
            <AvatarImage size={150} />
          </TouchableOpacity>
        </FadeInView>
        <UserText variant="title">{currentUser.displayName}</UserText>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="Check your favourites"
          left={heartIcon}
          onPress={() => navigation.navigate("My Favourite Restaurants")}
        />
        <SettingsItem
          title="Delivery Address"
          description="Edit your delivery address"
          left={addressIcon}
          onPress={() =>
            Alert.alert(
              "Under Progress",
              "This will be the Delivery Address menu."
            )
          }
        />
        <SettingsItem
          title="Personal Data"
          description="Edit your personal data"
          left={personalIcon}
          onPress={() => navigation.navigate("Personal Data")}
        />
        <SettingsItem
          title="Previous Orders"
          description="Check your previous orders"
          left={ordersIcon}
          onPress={() =>
            Alert.alert(
              "Under Progress",
              "This will be the Previous Orders menu."
            )
          }
        />
        <SettingsItem title="Logout" left={doorIcon} onPress={onSignOut} />
      </List.Section>
    </SafeArea>
  );
};
