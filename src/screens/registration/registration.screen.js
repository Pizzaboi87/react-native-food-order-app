import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { DialogWindow } from "../../components/dialog-modal/dialog-modal.component";
import { StyledText } from "../../helpers/typography/text.helper";
import * as Account from "../../helpers/account-styles/account-styles.helper";
import * as Common from "../../helpers/common-button/common-button.helper";
import * as Style from "./registration.styles";

export const RegistrationScreen = ({ navigation }) => {
  const { onRegister, error, setError, isLoading, checkEmail, setCheckEmail } =
    useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [nickName, setNickName] = useState("");

  return (
    <Account.Background>
      <Account.Cover>
        <Account.Container>
          <Common.Title>Sign-Up Your New Account</Common.Title>
          <Common.AuthInput
            label="your nickname"
            value={nickName}
            textContentType="nickname"
            autoCapitalize="none"
            autoComplete="off"
            keyboardType="email-address"
            onFocus={() => setError(null)}
            onChangeText={(userNickName) => setNickName(userNickName)}
          />
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
          <Common.AuthInput
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
            <Style.ErrorContainer>
              <StyledText variant="error">{error}</StyledText>
            </Style.ErrorContainer>
          )}
          <Common.ButtonContainer>
            {!isLoading ? (
              <Style.Buttons>
                <Style.RegisterButton
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
                </Style.RegisterButton>
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
      <DialogWindow
        variant="go"
        message={"Before we continue...\nPlease check your mailbox!"}
        visible={checkEmail}
        setVisible={setCheckEmail}
        navigation={navigation}
        whereTo="Main"
      />
    </Account.Background>
  );
};
