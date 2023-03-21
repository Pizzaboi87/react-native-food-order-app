import React, { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../helpers/safe-area/safe-area.helper";

export const Settings = () => {
  const { onSignOut } = useContext(AuthenticationContext);

  return (
    <SafeArea
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Settings Screen</Text>
      <Button onPress={() => onSignOut()}>Sign Out</Button>
    </SafeArea>
  );
};
