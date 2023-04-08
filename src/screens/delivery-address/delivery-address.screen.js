import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import {
  addAddressToUser,
  getUserData,
} from "../../services/firebase/firebase-config.service";
import {
  DataInput,
  Container,
  Title,
  RowView,
  Submit,
} from "./delivery-address.styles";

export const DeliveryAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState({
    city: "",
    zip: "",
    state: "",
    street: "",
    number: "",
    floor: "",
    door: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData("address");
      if (userData) {
        setAddress(userData);
      }
    };
    fetchUserData();
  }, []);

  const submitAddress = () => {
    if (Object.values(address).every((value) => value !== "")) {
      addAddressToUser(address);
      navigation.goBack();
    } else {
      Alert.alert("Error", "You didn't fill out every input field!");
    }
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
            autoCapitalize="words"
            autoComplete="off"
            keyboardType="email-address"
            onChangeText={(city) =>
              handleAddressChange("city", city, regexLetters)
            }
          />
          <DataInput
            width={95}
            label="State"
            value={address.state}
            textContentType="addressState"
            autoCapitalize="characters"
            autoComplete="off"
            keyboardType="email-address"
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
            autoCapitalize="characters"
            autoComplete="off"
            keyboardType="numeric"
            onChangeText={(zip) =>
              handleAddressChange("zip", zip, regexNumbers)
            }
          />
          <DataInput
            width={205}
            label="Street"
            value={address.street}
            textContentType="streetAddressLine1"
            autoCapitalize="sentences"
            autoComplete="off"
            keyboardType="email-address"
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
            onChangeText={(door) =>
              handleAddressChange("door", door, regexNumbers)
            }
          />
        </RowView>
      </View>
      <Submit onPress={submitAddress}>Submit</Submit>
    </Container>
  );
};
