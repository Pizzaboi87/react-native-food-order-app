import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Picture as Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import * as Style from "./delivery-address.styles";
import {
  addAddressToUser,
  getUserData,
} from "../../services/firebase/firebase-config.service";

export const DeliveryAddressScreen = ({ navigation }) => {
  const [missingError, setMissingError] = useState(false);
  const [addressDone, setAddressDone] = useState(false);
  const [addressWrong, setAddressWrong] = useState(false);
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
      addAddressToUser(address, setAddressDone, setAddressWrong);
    } else {
      setMissingError(true);
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
    <Style.Container>
      <Gif source={require("../../../assets/wait.gif")} />
      <Style.Title variant="title">Edit Your Delivery Address</Style.Title>
      <View>
        <Style.RowView>
          <Style.DataInput
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
          <Style.DataInput
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
        </Style.RowView>
        <Style.RowView>
          <Style.DataInput
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
          <Style.DataInput
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
        </Style.RowView>
        <Style.RowView>
          <Style.DataInput
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
          <Style.DataInput
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
          <Style.DataInput
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
        </Style.RowView>
      </View>
      <Style.Submit onPress={submitAddress}>Submit</Style.Submit>
      <DialogWindow
        variant="go"
        message="Please fill out every input field!"
        visible={missingError}
        setVisible={setMissingError}
      />
      <DialogWindow
        variant="error"
        message="Oops.. Something went wrong."
        visible={addressWrong}
        setVisible={setAddressWrong}
      />
      <DialogWindow
        variant="done"
        message={
          "Successful Modification,\nYour details has been added to your account."
        }
        visible={addressDone}
        setVisible={setAddressDone}
        navigation={navigation}
      />
    </Style.Container>
  );
};
