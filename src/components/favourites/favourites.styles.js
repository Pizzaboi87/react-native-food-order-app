import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${(props) => props.theme.sizes[4]};
  right: ${(props) => props.theme.sizes[4]};
  z-index: 9;
`;
