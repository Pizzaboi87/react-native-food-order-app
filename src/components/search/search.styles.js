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
