import React, { useState, useContext } from "react";
import { View } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import {
  DataInput,
  Container,
  Title,
  RowView,
  Submit,
} from "./delivery-address.styles";

export const DeliveryAddressScreen = () => {
  const { setError } = useContext(AuthenticationContext);
  const [city, setCity] = useState("");

  return (
    <Container>
      <Gif source={require("../../../assets/wait.gif")} />
      <Title variant="title">Edit Your Delivery Address</Title>
      <View>
        <RowView>
          <DataInput
            width={180}
            label="City"
            value={city}
            textContentType="addressCity"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(userCity) => setCity(userCity)}
          />
          <DataInput width={100} label="ZIP" />
        </RowView>
        <DataInput width={300} label="Street" />
        <RowView>
          <DataInput width={90} label="House" />
          <DataInput width={90} label="Floor" />
          <DataInput width={90} label="Door" />
        </RowView>
      </View>
      <Submit>Submit</Submit>
    </Container>
  );
};
