import React from "react";
import { Portal, Dialog } from "react-native-paper";
import {
  ControlContainer,
  ControlText,
  DescriptionText,
  DialogContainer,
  ControlButton,
  QuantityText,
  CartButton,
  MinusIcon,
  PlusIcon,
} from "./foodselector.styles";

export const FoodSelector = ({
  visible,
  setVisible,
  name,
  price,
  description,
  quantity,
  add,
  remove,
}) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <DialogContainer visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <ControlText>{name}</ControlText>
        </Dialog.Title>

        <Dialog.Content>
          <DescriptionText>{description}</DescriptionText>
        </Dialog.Content>

        <ControlContainer>
          <ControlButton onPress={remove}>
            <MinusIcon />
          </ControlButton>
          <QuantityText>{quantity}</QuantityText>
          <ControlButton onPress={add}>
            <PlusIcon />
          </ControlButton>
          <CartButton disabled={quantity > 0 ? false : true}>
            Add To Cart - {price * quantity}€
          </CartButton>
        </ControlContainer>
      </DialogContainer>
    </Portal>
  );
};
