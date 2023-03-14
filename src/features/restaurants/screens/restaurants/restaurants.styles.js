import styled from "styled-components";
import { SafeAreaView, View, StatusBar } from "react-native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

export const ListContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;
