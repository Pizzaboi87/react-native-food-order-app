import React, { useContext, useState } from "react";
import { Portal, Dialog } from "react-native-paper";
import { CartContext } from "../../services/cart/cart.context";
import { DialogWindow } from "../dialog-modal/dialog-modal.component";
import { getOpenStatus } from "../../helpers/get-open-status/get-open.status.helper";
import * as Style from "./foodselector.styles";

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

  const order = (ordId, ordName, ordPrice, ordQuantity) => {
    addToCart(ordId, ordName, ordPrice, ordQuantity);
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
      <Style.DialogContainer visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          <Style.ControlText>{name}</Style.ControlText>
        </Dialog.Title>

        <Dialog.Content>
          <Style.DescriptionText>{description}</Style.DescriptionText>
        </Dialog.Content>

        <Style.ControlContainer>
          <Style.ControlButton onPress={remove}>
            <Style.MinusIcon />
          </Style.ControlButton>
          <Style.QuantityText>{quantity}</Style.QuantityText>
          <Style.ControlButton onPress={add}>
            <Style.PlusIcon />
          </Style.ControlButton>
          <Style.CartButton
            disabled={hasOrder && isOpen ? false : true}
            onPress={() => order(id, name, price, quantity)}
          >
            {isOpen
              ? `Add To Cart - ${price * quantity}€`
              : "Restaurant is Closed"}
          </Style.CartButton>
        </Style.ControlContainer>
      </Style.DialogContainer>
      <DialogWindow
        variant="done"
        message="The product has been added to the cart."
        visible={addedDone}
        setVisible={setAddedDone}
      />
    </Portal>
  );
};
