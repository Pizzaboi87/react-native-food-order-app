import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import {
  Container,
  CorrectedGif,
  DataInput,
  PhoneNumber,
  Submit,
  Title,
} from "./personal-data.styles";
import {
  setUserPersonalData,
  getUserData,
} from "../../services/firebase/firebase-config.service";

export const PersonalDataScreen = ({ navigation }) => {
  const phoneInput = useRef(null);
  const [missingError, setMissingError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [personalDone, setPersonalDone] = useState(false);
  const [personalError, setPersonalError] = useState(false);
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const [personalData, displayName] = await Promise.all([
        getUserData("personalData"),
        getUserData("displayName"),
      ]);
      if (personalData && displayName) {
        const { firstName, lastName, phone } = personalData;
        setPersonal({
          firstName: firstName,
          lastName: lastName,
          nickName: displayName,
          phone: phone,
        });
      } else if (!personalData && displayName) {
        setPersonal((prevPersonal) => ({
          ...prevPersonal,
          nickName: displayName,
        }));
      }
    };
    fetchUserData();
  }, []);

  const handleDataChange = (fieldName, fieldValue) => {
    const regexLetters = /^[a-zA-Z\s]*$/;
    if (regexLetters.test(fieldValue)) {
      setPersonal((prevData) => ({
        ...prevData,
        [fieldName]: fieldValue,
      }));
    }
  };

  const handlePhoneChange = (text) => {
    const phoneRegex = /^\+[0-9]*$/;
    if (phoneRegex.test(text)) {
      setPersonal((prevData) => ({
        ...prevData,
        phone: text,
      }));
    }
  };

  const submitPersonalData = () => {
    const checkValid = phoneInput.current.isValidNumber(personal.phone);
    if (Object.values(personal).every((value) => value !== "") && checkValid) {
      setUserPersonalData(personal, setPersonalDone, setPersonalError);
    } else if (!checkValid) {
      setPhoneError(true);
    } else {
      setMissingError(true);
    }
  };

  return (
    <Container>
      <DialogWindow
        variant="go"
        message="Please fill out every input field!"
        visible={missingError}
        setVisible={setMissingError}
      />
      <DialogWindow
        variant="error"
        message="The phone number is invalid."
        visible={phoneError}
        setVisible={setPhoneError}
      />
      <DialogWindow
        variant="error"
        message="Oops.. Something went wrong."
        visible={personalError}
        setVisible={setPersonalError}
      />
      <DialogWindow
        variant="done"
        message={`Successful Modification\nYour details has been added to your account.`}
        visible={personalDone}
        setVisible={setPersonalDone}
        navigation={navigation}
      />
      <CorrectedGif source={require("../../../assets/thinking.gif")} />
      <Title variant="title">Edit Your Personal Details</Title>
      <View>
        <DataInput
          width={300}
          label="First Name"
          name="firstName"
          value={personal.firstName}
          textContentType="givenName"
          autoCapitalize="words"
          autoComplete="off"
          keyboardType="email-address"
          onChangeText={(name) => handleDataChange("firstName", name)}
        />

        <DataInput
          width={300}
          label="Last Name"
          name="lastName"
          value={personal.lastName}
          textContentType="familyName"
          autoCapitalize="words"
          autoComplete="off"
          keyboardType="email-address"
          onChangeText={(name) => handleDataChange("lastName", name)}
        />

        <DataInput
          width={300}
          label="Nickname"
          name="nickName"
          value={personal.nickName}
          textContentType="nickname"
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="email-address"
          onChangeText={(name) => handleDataChange("nickName", name)}
        />

        <PhoneNumber
          ref={phoneInput}
          placeholder={
            personal.phone
              ? `${personal.phone.slice(3, personal.phone.length)}`
              : "Phone Number"
          }
          name="phone"
          layout="first"
          value={personal.phone}
          defaultCode="HU"
          textContentType="telephoneNumber"
          onChangeFormattedText={(text) => {
            handlePhoneChange(text);
          }}
        />

        <Submit onPress={submitPersonalData}>Submit</Submit>
      </View>
    </Container>
  );
};
