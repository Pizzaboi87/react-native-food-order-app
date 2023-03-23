import React, { useContext } from "react";
import { List } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import {
  SettingsItem,
  AvatarContainer,
  UserAvatar,
  HeartIcon,
  DoorIcon,
} from "./settings.styles";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";

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
        <UserAvatar />
        <StyledText variant="title">{currentUser.displayName}</StyledText>
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
