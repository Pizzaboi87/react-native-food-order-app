import React, { useContext } from "react";
import { List } from "react-native-paper";
import { ListItem } from "./settings.styles";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";

export const SettingsScreen = ({ navigation }) => {
  const { onSignOut } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <List.Section>
        <ListItem
          title="Favourites"
          description="Check your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <ListItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onSignOut}
        />
      </List.Section>
    </SafeArea>
  );
};
