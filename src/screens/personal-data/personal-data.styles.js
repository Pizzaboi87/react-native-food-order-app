import styled from "styled-components/native";
import { Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";

export const PersonalContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
  align-items: center;
  justify-content: center;
`;

export const PersonalTitle = styled(StyledText)`
  margin-bottom: 25px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

export const Waiting = styled(Image)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

export const DataInput = styled(TextInput)`
  margin-bottom: 30px;
  background-color: white;
  width: ${(props) => props.width}px;
`;

export const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Submit = styled(Button).attrs({
  mode: "contained",
  labelStyle: {
    fontSize: 15,
  },
})`
  background-color: green;
  align-self: flex-end;
  margin-right: 45px;
  border-radius: 5px;
  padding: 5px;
`;
