import styled from "styled-components/native";

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const IndicatorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
