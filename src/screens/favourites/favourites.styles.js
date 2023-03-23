import styled from "styled-components/native";

export const FavouritesContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const NoFavouritesContainer = styled(FavouritesContainer)`
  align-items: center;
  justify-content: center;
`;
