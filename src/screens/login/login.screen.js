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
  ButtonContainer,
} from "../account/account.styles";
import { StyledText } from "../../helpers/typography/text.helper";

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, setError } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <Title variant="label">Sign-In To Your Account</Title>
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
          {error && (
            <ErrorContainer>
              <StyledText variant="error">{error}</StyledText>
            </ErrorContainer>
          )}
          <ButtonContainer>
            <BackButton onPress={() => navigation.goBack()}>back</BackButton>
            <LoginButton
              onPress={() => onLogin(email, password)}
              mode="contained"
            >
              sign-in
            </LoginButton>
          </ButtonContainer>
        </AccountContainer>
      </AccountCover>
    </AccountBackground>
  );
};
