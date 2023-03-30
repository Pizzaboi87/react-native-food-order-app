import React, { useState, useContext } from "react";
import { Alert, View } from "react-native";
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
  const [address, setAddress] = useState({
    city: "",
    zip: "",
    state: "",
    street: "",
    number: "",
    floor: "",
    door: "",
  });

  const test = () => {
    Alert.alert(
      "Your Address",
      `city: ${address.city}\nstate: ${address.state}\nzip: ${address.zip}\nstreet: ${address.street}\nhouse nr: ${address.number}\nfloor: ${address.floor}\ndoor: ${address.door}`
    );
  };

  return (
    <Container>
      <Gif source={require("../../../assets/wait.gif")} />
      <Title variant="title">Edit Your Delivery Address</Title>
      <View>
        <RowView>
          <DataInput
            width={205}
            label="City"
            value={address.city}
            textContentType="addressCity"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(city) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                city: city,
              }));
            }}
          />
          <DataInput
            width={95}
            label="State"
            value={address.state}
            textContentType="addressState"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(state) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                state: state,
              }));
            }}
          />
        </RowView>
        <RowView>
          <DataInput
            width={95}
            label="ZIP"
            value={address.zip}
            textContentType="postalCode"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            onFocus={() => setError(null)}
            onChangeText={(zip) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                zip: zip,
              }));
            }}
          />
          <DataInput
            width={205}
            label="Street"
            value={address.street}
            textContentType="streetAddressLine1"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(street) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                street: street,
              }));
            }}
          />
        </RowView>
        <RowView>
          <DataInput
            width={95}
            label="Number"
            value={address.number}
            textContentType="none"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            onFocus={() => setError(null)}
            onChangeText={(number) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                number: number,
              }));
            }}
          />
          <DataInput
            width={95}
            label="Floor"
            value={address.floor}
            textContentType="none"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            onFocus={() => setError(null)}
            onChangeText={(floor) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                floor: floor,
              }));
            }}
          />
          <DataInput
            width={95}
            label="Door"
            value={address.door}
            textContentType="none"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="numeric"
            onFocus={() => setError(null)}
            onChangeText={(door) => {
              setAddress((prevAddress) => ({
                ...prevAddress,
                door: door,
              }));
            }}
          />
        </RowView>
      </View>
      <Submit onPress={test}>Submit</Submit>
    </Container>
  );
};
