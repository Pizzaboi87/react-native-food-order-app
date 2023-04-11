import React, { useState } from "react";
import { sendPasswordReset } from "../../services/firebase/firebase-config.service";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthInput,
  Title,
  ButtonContainer,
  EmailButton,
  Buttons,
  JustTextButton,
} from "../account/account.styles";

export const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailPopUp, setEmailPopup] = useState(false);
  const [error, setError] = useState("noError");

  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <Title>Reset Your Password</Title>
          <AuthInput
            label="email address"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <ButtonContainer>
            <Buttons>
              <EmailButton
                onPress={() =>
                  sendPasswordReset(email, setEmailPopup, setError)
                }
              >
                Password Reset
              </EmailButton>

              <JustTextButton
                onPress={() => {
                  navigation.goBack();
                }}
              >
                back
              </JustTextButton>
            </Buttons>
          </ButtonContainer>
        </AccountContainer>
        <DialogWindow
          variant={error !== "noError" ? "error" : "done"}
          message={error !== "noError" ? error : "Password reset email sent!"}
          visible={emailPopUp}
          setVisible={setEmailPopup}
          navigation={navigation}
          whereTo="Main"
        />
      </AccountCover>
    </AccountBackground>
  );
};
