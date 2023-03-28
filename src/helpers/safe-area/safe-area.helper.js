import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `padding-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.ui.background};
`;
