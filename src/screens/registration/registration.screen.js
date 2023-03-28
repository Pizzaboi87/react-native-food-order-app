import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { StyledText } from "../../helpers/typography/text.helper";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  RegisterButton,
  AuthInput,
  Title,
  ErrorContainer,
  BackButton,
  ButtonContainer,
  Loading,
} from "../account/account.styles";

export const RegistrationScreen = ({ navigation }) => {
  const { onRegister, error, setError, isLoading } = useContext(
    AuthenticationContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [nickName, setNickName] = useState("");

  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <Title>Sign-Up Your New Account</Title>
          <AuthInput
            label="your nickname"
            value={nickName}
            textContentType="nickname"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(userNickName) => setNickName(userNickName)}
          />
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
          <AuthInput
            label="repeat password"
            value={repeatedPassword}
            textContentType="password"
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry
            onFocus={() => setError(null)}
            onChangeText={(userRepeatedPassword) =>
              setRepeatedPassword(userRepeatedPassword)
            }
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
                <RegisterButton
                  onPress={() =>
                    onRegister(
                      nickName,
                      email,
                      password,
                      repeatedPassword,
                      navigation
                    )
                  }
                  mode="contained"
                >
                  register
                </RegisterButton>
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
