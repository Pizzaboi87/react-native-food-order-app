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

  const regexLetters = /^[a-zA-Z\s]*$/;
  const regexNumbers = /^\d{0,5}$/;

  const handleAddressChange = (fieldName, fieldValue, regexType) => {
    if (regexType.test(fieldValue)) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [fieldName]: fieldValue,
      }));
    }
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
            name="city"
            value={address.city}
            textContentType="addressCity"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(city) =>
              handleAddressChange("city", city, regexLetters)
            }
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
            onChangeText={(state) =>
              handleAddressChange("state", state, regexLetters)
            }
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
            onChangeText={(zip) =>
              handleAddressChange("zip", zip, regexNumbers)
            }
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
            onChangeText={(street) =>
              handleAddressChange("street", street, regexLetters)
            }
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
            onChangeText={(number) =>
              handleAddressChange("number", number, regexNumbers)
            }
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
            onChangeText={(floor) =>
              handleAddressChange("floor", floor, regexNumbers)
            }
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
            onChangeText={(door) =>
              handleAddressChange("door", door, regexNumbers)
            }
          />
        </RowView>
      </View>
      <Submit onPress={test}>Submit</Submit>
    </Container>
  );
};
