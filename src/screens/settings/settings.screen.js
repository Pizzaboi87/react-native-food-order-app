import React, { useContext } from "react";
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
  ListContainer,
} from "./settings.styles";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser, uid } = useContext(AuthenticationContext);
  const { useLoadImage } = useContext(UserImageContext);

  const heartIcon = createIcon(HeartIcon);
  const doorIcon = createIcon(DoorIcon);
  const personalIcon = createIcon(PersonalIcon);
  const addressIcon = createIcon(AddressIcon);
  const ordersIcon = createIcon(OrdersIcon);

  useLoadImage(uid);

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
      <ListContainer>
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
          onPress={() => navigation.navigate("Delivery Address")}
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
      </ListContainer>
    </SafeArea>
  );
};
