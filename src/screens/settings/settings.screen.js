import React, { useContext } from "react";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import {
  SettingsItem,
  AvatarContainer,
  UserAvatar,
  HeartIcon,
  DoorIcon,
  UserText,
} from "./settings.styles";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";
import { FadeInView } from "../../animations/fade.animation";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut, currentUser } = useContext(AuthenticationContext);

  const heartIcon = (props) => {
    return <HeartIcon {...props} />;
  };

  const doorIcon = (props) => {
    return <DoorIcon {...props} />;
  };

  return (
    <SafeArea>
      <AvatarContainer>
        <FadeInView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Profile Picture")}
          >
            <UserAvatar />
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
