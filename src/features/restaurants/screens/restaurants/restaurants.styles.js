import styled from "styled-components";
import { SafeAreaView, View } from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${(props) => props.device};
`;

export const Search = styled(View)`
  padding: 16px;
`;

export const ListContainer = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: blue;
`;
