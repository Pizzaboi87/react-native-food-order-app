import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { ActivityIndicator } from "react-native-paper";

export const IndicatorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 50,
})``;
