import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { StyledText } from "../../helpers/typography/text.helper";
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
  Loading,
} from "../account/account.styles";

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, setError, isLoading } = useContext(
    AuthenticationContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <Title>Sign-In To Your Account</Title>
          <AuthInput
            label="email address"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <AuthInput
            label="password"
            value={password}
            textContentType="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry
            onFocus={() => setError(null)}
            onChangeText={(userPassword) => setPassword(userPassword)}
          />
          {error && (
            <ErrorContainer>
              <StyledText variant="error">{error}</StyledText>
            </ErrorContainer>
          )}
          <ButtonContainer>
            {!isLoading ? (
              <>
                <BackButton
                  onPress={() => {
                    setError(null);
                    navigation.goBack();
                  }}
                >
                  back
                </BackButton>
                <LoginButton
                  onPress={() => onLogin(email, password)}
                  mode="contained"
                >
                  sign-in
                </LoginButton>
              </>
            ) : (
              <Loading />
            )}
          </ButtonContainer>
        </AccountContainer>
      </AccountCover>
    </AccountBackground>
  );
};
