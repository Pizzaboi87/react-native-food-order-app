import React from "react";
import { Dialog, Portal } from "react-native-paper";
import * as Style from "./dialog-modal.styles";

export const DialogWindow = ({
  variant,
  message,
  visible,
  setVisible,
  navigation,
  whereTo,
}) => {
  const hideDialog = () => {
    setVisible(false);
    if (navigation && whereTo) {
      navigation.navigate(whereTo);
    } else if (navigation && !whereTo) {
      navigation.goBack();
    }
  };

  return (
    <Portal>
      {visible && <Style.DialogBackground />}
      <Style.DialogContainer visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Style.GifVariant variant={variant} />
          <Style.DialogMessage>{message}</Style.DialogMessage>
          <Style.DialogButton onPress={hideDialog}>OK</Style.DialogButton>
        </Dialog.Content>
      </Style.DialogContainer>
    </Portal>
  );
};
