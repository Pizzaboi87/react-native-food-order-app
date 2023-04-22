import React, { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { StyledText } from "../../helpers/typography/text.helper";
import * as Account from "../../helpers/account-styles/account-styles.helper";
import * as Common from "../../helpers/common-button/common-button.helper";
import * as Style from "./login.style";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, setError, isLoading, googleSignIn } = useContext(
    AuthenticationContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "1035111378933-h7479g0o6fe9p9tct1eumq788qv96r8t.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);*/

  /*async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }*/

  //if (initializing) return null;

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
