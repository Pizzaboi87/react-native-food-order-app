import React, { useContext, useState, useCallback } from "react";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {
  SettingsItem,
  AvatarContainer,
  UserAvatar,
  HeartIcon,
  DoorIcon,
  UserText,
  UserPhoto,
} from "./settings.styles";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { FadeInView } from "../../animations/fade.animation";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const heartIcon = (props) => {
    return <HeartIcon {...props} />;
  };

  const doorIcon = (props) => {
    return <DoorIcon {...props} />;
  };

  const getProfilePicture = async (user) => {
    const photoUri = await AsyncStorage.getItem(`${user.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(currentUser);
    }, [currentUser])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Profile Picture")}
          >
            {photo ? <UserPhoto source={{ uri: photo }} /> : <UserAvatar />}
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
        <SettingsItem title="Logout" left={doorIcon} onPress={onSignOut} />
      </List.Section>
    </SafeArea>
  );
};
