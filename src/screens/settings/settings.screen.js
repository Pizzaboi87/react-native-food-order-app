import React, { useContext, useCallback, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { UserImageContext } from "../../services/user-image/user-image.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { FadeInView } from "../../animations/fade.animation";
import { AvatarImage } from "../../components/user-avatar/user-avatar.component";
import { getUserData } from "../../services/firebase/firebase-config.service";
import { useFocusEffect } from "@react-navigation/native";
import * as Style from "./settings.styles";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, uid } = useContext(AuthenticationContext);
  const { useLoadImage } = useContext(UserImageContext);
  const [userName, setUserName] = useState("");

  const heartIcon = Style.createIcon(Style.HeartIcon);
  const doorIcon = Style.createIcon(Style.DoorIcon);
  const personalIcon = Style.createIcon(Style.PersonalIcon);
  const addressIcon = Style.createIcon(Style.AddressIcon);
  const ordersIcon = Style.createIcon(Style.OrdersIcon);
  const passwordIcon = Style.createIcon(Style.PasswordIcon);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        const userData = await getUserData("displayName");
        if (userData) {
          setUserName(userData);
        }
      };
      fetchUserData();
    }, [])
  );

  useLoadImage(uid);

  return (
    <SafeArea>
      <Style.AvatarContainer>
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Profile Image")}
          >
            <AvatarImage size={150} />
          </TouchableOpacity>
        </FadeInView>
        <Style.UserText variant="title">{userName}</Style.UserText>
      </Style.AvatarContainer>
      <ScrollView>
        <Style.SettingsItem
          title="Favourites"
          description="Check your favourites"
          left={heartIcon}
          onPress={() => navigation.navigate("My Favourite Restaurants")}
        />
        <Style.SettingsItem
          title="Previous Orders"
          description="Check your previous orders"
          left={ordersIcon}
          onPress={() => navigation.navigate("Previous Orders")}
        />
        <Style.SettingsItem
          title="Delivery Address"
          description="Edit your delivery address"
          left={addressIcon}
          onPress={() => navigation.navigate("Delivery Address")}
        />
        <Style.SettingsItem
          title="Personal Details"
          description="Edit your personal details"
          left={personalIcon}
          onPress={() => navigation.navigate("Personal Details")}
        />
        <Style.SettingsItem
          title="Change Password"
          description="Change your password"
          left={passwordIcon}
          onPress={() => navigation.navigate("Change Password")}
        />
        <Style.SettingsItem
          title="Logout"
          left={doorIcon}
          onPress={onSignOut}
        />
      </ScrollView>
    </SafeArea>
  );
};
