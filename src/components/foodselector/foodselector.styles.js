import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { Button, Dialog } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import { AntDesign } from "@expo/vector-icons";

export const DialogContainer = styled(Dialog)`
  background-color: ${(props) => props.theme.colors.ui.card};
  position: absolute;
  bottom: 0;
  margin: 0;
  width: 100%;
  height: 200px;
  border-radius: 0;
  align-items: center;
`;

export const ControlButton = styled(Button).attrs({
  mode: "contained",
  buttonColor: theme.colors.ui.title,
})`
  justify-content: center;
  align-items: center;
  padding: 3px;
  padding-left: 5px;
`;

export const CartButton = styled(ControlButton).attrs({
  labelStyle: {
    color: theme.colors.bg.primary,
  },
})`
  width: 160px;
`;

export const ControlText = styled(StyledText).attrs({
  variant: "title",
})`
  font-size: ${(props) => props.theme.fontSizes.title};
  text-align: center;
`;

export const QuantityText = styled(ControlText)`
  width: 40px;
  margin-right: -7px;
`;

export const DescriptionText = styled(StyledText).attrs({
  variant: "lightCaption",
})`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-style: italic;
`;

export const ControlContainer = styled(Dialog.Actions)`
  justify-content: space-between;
  width: 100%;
`;

export const MinusIcon = styled(AntDesign).attrs({
  color: theme.colors.bg.primary,
  size: 20,
  name: "minuscircle",
})``;

export const PlusIcon = styled(AntDesign).attrs({
  color: theme.colors.bg.primary,
  size: 20,
  name: "pluscircle",
})``;
