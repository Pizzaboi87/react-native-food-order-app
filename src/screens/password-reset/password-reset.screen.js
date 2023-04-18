import React, { useState } from "react";
import { sendPasswordReset } from "../../services/firebase/firebase-config.service";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import * as Account from "../../helpers/account-styles/account-styles.helper";
import * as Common from "../../helpers/common-button/common-button.helper";
import * as Style from "./password-reset.styles";

export const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailPopUp, setEmailPopup] = useState(false);
  const [error, setError] = useState("noError");

  return (
    <Account.Background>
      <Account.Cover>
        <Account.Container>
          <Common.Title>Reset Your Password</Common.Title>
          <Common.AuthInput
            label="email address"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <Common.ButtonContainer>
            <Style.Buttons>
              <Style.EmailButton
                onPress={() =>
                  sendPasswordReset(email, setEmailPopup, setError)
                }
              >
                Password Reset
              </Style.EmailButton>

              <Common.JustTextButton
                onPress={() => {
                  navigation.goBack();
                }}
              >
                back
              </Common.JustTextButton>
            </Style.Buttons>
          </Common.ButtonContainer>
        </Account.Container>
        <DialogWindow
          variant={error !== "noError" ? "error" : "done"}
          message={error !== "noError" ? error : "Password reset email sent!"}
          visible={emailPopUp}
          setVisible={setEmailPopup}
          navigation={navigation}
          whereTo="Main"
        />
      </Account.Cover>
    </Account.Background>
  );
};
