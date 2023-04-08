import React from "react";
import { Dialog, Portal } from "react-native-paper";
import {
  DialogBackground,
  DialogButton,
  DialogContainer,
  DialogMessage,
  GifVariant,
} from "./dialog-modal.styles";

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
      {visible && <DialogBackground />}
      <DialogContainer visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <GifVariant variant={variant} />
          <DialogMessage>{message}</DialogMessage>
          <DialogButton onPress={hideDialog}>OK</DialogButton>
        </Dialog.Content>
      </DialogContainer>
    </Portal>
  );
};
