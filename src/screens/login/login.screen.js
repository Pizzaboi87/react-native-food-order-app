import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { StyledText } from "../../helpers/typography/text.helper";
import * as Account from "../../helpers/account-styles/account-styles.helper";
import * as Common from "../../helpers/common-button/common-button.helper";
import * as Style from "./login.style";

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, setError, isLoading, googleSignIn } = useContext(
    AuthenticationContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Account.Background>
      <Account.Cover>
        <Account.Container>
          <Common.Title>Sign-In To Your Account</Common.Title>
          <Common.AuthInput
            label="email address"
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <Common.AuthInput
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
            <Style.ErrorContainer>
              <StyledText variant="error">{error}</StyledText>
            </Style.ErrorContainer>
          )}
          <Common.ButtonContainer>
            {!isLoading ? (
              <Style.Buttons>
                <Style.EmailButton onPress={() => onLogin(email, password)}>
                  sign-in with email
                </Style.EmailButton>

                <Style.GoogleButton onPress={googleSignIn}>
                  sign-in with Google
                </Style.GoogleButton>

                <Common.JustTextButton
                  onPress={() => navigation.navigate("Reset")}
                >
                  Forgot your password?
                </Common.JustTextButton>

                <Common.JustTextButton
                  onPress={() => {
                    setError(null);
                    navigation.goBack();
                  }}
                >
                  back
                </Common.JustTextButton>
              </Style.Buttons>
            ) : (
              <Style.Loading />
            )}
          </Common.ButtonContainer>
        </Account.Container>
      </Account.Cover>
    </Account.Background>
  );
};
