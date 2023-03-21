import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  LoginButton,
  AuthInput,
  Title,
  ErrorContainer,
  BackButton,
} from "../account/account.styles";
import { StyledText } from "../../helpers/typography/text.helper";

export const RegistrationScreen = ({ navigation }) => {
  const { onRegister, error, setError } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <Title variant="label">Sign-Up Your New Account</Title>
          <AuthInput
            label="email address"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onChangeText={(userEmail) => {
              setError(null);
              setEmail(userEmail);
            }}
          />
          <AuthInput
            label="password"
            value={password}
            textContentType="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry
            onChangeText={(userPassword) => {
              setError(null);
              setPassword(userPassword);
            }}
          />
          <AuthInput
            label="repeat password"
            value={repeatedPassword}
            textContentType="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry
            onChangeText={(userPassword) => {
              setError(null);
              setRepeatedPassword(userPassword);
            }}
          />
          {error && (
            <ErrorContainer>
              <StyledText variant="error">{error}</StyledText>
            </ErrorContainer>
          )}
          <LoginButton
            onPress={() => onRegister(email, password, repeatedPassword)}
            mode="contained"
          >
            register
          </LoginButton>
        </AccountContainer>
        <BackButton onPress={() => navigation.goBack()}>Back</BackButton>
      </AccountCover>
    </AccountBackground>
  );
};
