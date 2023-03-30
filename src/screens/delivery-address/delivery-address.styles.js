import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
  align-items: center;
  justify-content: center;
`;

export const Title = styled(StyledText)`
  margin-bottom: ${(props) => props.theme.sizes[4]}
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const DataInput = styled(TextInput)`
  margin-bottom: ${(props) => props.theme.space[4]}
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: ${(props) => props.width}px;
`;

export const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  column-gap: 15px;
`;

export const Submit = styled(Button).attrs({
  mode: "contained",
  labelStyle: {
    fontSize: 15,
  },
})`
  background-color: ${(props) => props.theme.colors.ui.success};
  width: 300px;
  border-radius: ${(props) => props.theme.sizes[0]};
  padding: ${(props) => props.theme.space[1]};
`;
