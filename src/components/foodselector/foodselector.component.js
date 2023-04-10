import React, { useContext } from "react";
import { Portal, Dialog } from "react-native-paper";
import { CartContext } from "../../services/cart/cart.context";
import { DialogWindow } from "../dialog-modal/dialog-modal.component";
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
import { useState } from "react";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";

export const FoodSelector = ({
  visible,
  setVisible,
  name,
  price,
  description,
  quantity,
  add,
  remove,
  id,
  fullfilled,
  openingHours,
  temporaryClosed,
}) => {
  const hideDialog = () => setVisible(false);
  const { addToCart } = useContext(CartContext);
  const [addedDone, setAddedDone] = useState(false);

  const order = (id, name, price, quantity) => {
    addToCart(id, name, price, quantity);
    fullfilled();
    setVisible(false);
    setAddedDone(true);
  };

  const openStatus = getOpenStatus(openingHours);
  const isOpen =
    openStatus === "open" && temporaryClosed !== "CLOSED_TEMPORARILY";
  const hasOrder = quantity > 0;

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
          <CartButton
            disabled={hasOrder && isOpen ? false : true}
            onPress={() => order(id, name, price, quantity)}
          >
            {isOpen
              ? `Add To Cart - ${price * quantity}€`
              : `Restaurant is Closed`}
          </CartButton>
        </ControlContainer>
      </DialogContainer>
      <DialogWindow
        variant="done"
        message="The product has been added to the cart."
        visible={addedDone}
        setVisible={setAddedDone}
      />
    </Portal>
  );
};
