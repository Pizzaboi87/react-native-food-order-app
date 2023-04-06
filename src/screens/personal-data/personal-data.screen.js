import React from "react";
import { Text } from "react-native";
import { Container } from "./personal-data.styles";
import { Button } from "react-native-paper";
import { findBranchByValue } from "../../services/firebase/firebase-config.service";

export const PersonalDataScreen = () => {
  const feature = async () => {
    const city = await findBranchByValue(48.2261059);
    console.log(city);
  };
  return (
    <Container>
      <Text>Personal Data Screen</Text>
      <Button onPress={feature}>Try new feature</Button>
    </Container>
  );
};
