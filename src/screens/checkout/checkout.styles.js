import styled from "styled-components/native";
import { ScrollView } from "react-native";

export const Container = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;
