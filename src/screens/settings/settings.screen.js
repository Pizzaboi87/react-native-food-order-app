import React, { useContext, useCallback } from "react";
import { Button, List } from "react-native-paper";
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
import { UserImageContext } from "../../services/user-image/user-image.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { FadeInView } from "../../animations/fade.animation";
import { Text } from "react-native";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser } = useContext(AuthenticationContext);
  const { loadImage, userImage } = useContext(UserImageContext);

  const heartIcon = (props) => {
    return <HeartIcon {...props} />;
  };

  const doorIcon = (props) => {
    return <DoorIcon {...props} />;
  };

  useFocusEffect(
    useCallback(() => {
      const getProfilePicture = async (user) => {
        await loadImage(user);
      };
      getProfilePicture(currentUser);
    }, [currentUser, loadImage])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Profile Image")}
          >
            {userImage ? (
              <UserPhoto source={{ uri: userImage }} />
            ) : (
              <UserAvatar />
            )}
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
        <Button onPress={() => console.log(userImage)}>
          <Text>Show</Text>
        </Button>
      </List.Section>
    </SafeArea>
  );
};
