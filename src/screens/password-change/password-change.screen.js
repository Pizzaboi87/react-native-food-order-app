import React, { useState } from "react";
import { Picture as Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { updateUserPassword } from "../../services/firebase/firebase-config.service";
import * as Style from "./password-change.styles";

export const PasswordChangeScreen = ({ navigation }) => {
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [doNotMatch, setDoNotMatch] = useState(false);
  const [changeFail, setChangeFail] = useState(false);
  const [authenticationFail, setAuthenticationFail] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [password, setPassword] = useState({
    currentPW: "",
    newPW1: "",
    newPW2: "",
  });

  const handleDataChange = (fieldName, fieldValue) => {
    setPassword((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const changePassword = () => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])[0-9a-zA-Z!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/]{8,}$/;
    if (password.newPW1 === password.newPW2) {
      if (passwordRegex.test(password.newPW1)) {
        updateUserPassword(
          password.currentPW,
          password.newPW1,
          setChangeSuccess,
          setChangeFail,
          setAuthenticationFail
        );
      } else {
        setWeakPassword(true);
      }
    } else {
      setDoNotMatch(true);
    }
  };

  return (
    <Style.Container>
      <Gif source={require("../../../assets/mouse.gif")} />
      <Style.Title variant="title">Change Your Password</Style.Title>
      <Style.PasswordInput
        width={300}
        label="Current Password"
        name="pwc"
        value={password.currentPW}
        textContentType="password"
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry
        onChangeText={(currentPW) => handleDataChange("currentPW", currentPW)}
      />

      <Style.PasswordInput
        width={300}
        label="New Password"
        name="newPW1"
        value={password.newPW1}
        textContentType="newPassword"
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry
        onChangeText={(newPW1) => handleDataChange("newPW1", newPW1)}
      />

      <Style.PasswordInput
        width={300}
        label="Repeat New Password"
        name="newPW2"
        value={password.newPW2}
        textContentType="newPassword"
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry
        onChangeText={(newPW2) => handleDataChange("newPW2", newPW2)}
      />
      <Style.ChangeButton onPress={changePassword}>Submit</Style.ChangeButton>

      <DialogWindow
        variant="error"
        message={"Password change failed.\nPlease try again later."}
        visible={changeFail}
        setVisible={setChangeFail}
      />

      <DialogWindow
        variant="error"
        message="Passwords do not match."
        visible={doNotMatch}
        setVisible={setDoNotMatch}
      />

      <DialogWindow
        variant="error"
        message="Your current password is not correct."
        visible={authenticationFail}
        setVisible={setAuthenticationFail}
      />

      <DialogWindow
        variant="thinking"
        message={
          "Your new password is weak. It should:\n- Be at least 8 characters long\n- Contain at least one lowercase letter\n- Contain at least one uppercase letter\n- Contain at least one number\n- Contain at least one special character"
        }
        visible={weakPassword}
        setVisible={setWeakPassword}
      />

      <DialogWindow
        variant="done"
        message="Your password has been changed."
        visible={changeSuccess}
        setVisible={setChangeSuccess}
        navigation={navigation}
      />
    </Style.Container>
  );
};
