import styled from "styled-components/native";
import { Gif } from "../../helpers/gif-plus-text/gif-plus-text.helper";
import { StyledText } from "../../helpers/typography/text.helper";
import { Button, Dialog, Portal } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

const gifMap = {
  wait: require("../../../assets/wait.gif"),
  done: require("../../../assets/done.gif"),
  error: require("../../../assets/scared.gif"),
  go: require("../../../assets/go.gif"),
  thinking: require("../../../assets/thinking.gif"),
};

export const GifVariant = styled(Gif).attrs((props) => ({
  source: gifMap[props.variant] || gifMap["wait.gif"],
}))`
  width: 150px;
  height: 150px;
`;

export const DialogContainer = styled(Dialog)`
  background-color: ${(props) => props.theme.colors.ui.card};
`;

export const DialogMessage = styled(StyledText)`
  font-size: ${(props) => props.theme.sizes[3]};
  margin-bottom: ${(props) => props.theme.space[4]};
  text-align: center;
`;

export const DialogButton = styled(Button).attrs({
  mode: "contained",
  buttonColor: theme.colors.ui.title,
})`
  width: 100px;
  align-self: center;
`;

export const DialogBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(250, 164, 131, 0.9);
`;
