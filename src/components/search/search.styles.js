import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

export const SearchContainerRestaurant = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const SearchContainerMap = styled(SearchContainerRestaurant)`
  position: absolute;
  z-index: 10;
  top: 35px;
  width: 100%;
`;

export const SearchBarOrange = styled(Searchbar)`
  border-color: ${(props) => props.theme.colors.ui.brand};
  border-width: 1px;
`;
