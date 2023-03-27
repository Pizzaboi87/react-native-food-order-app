import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { ActivityIndicator } from "react-native-paper";
import { StyledText } from "../../helpers/typography/text.helper";
import { Image } from "react-native";

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

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: theme.colors.ui.brand,
  size: 50,
})``;

export const ErrorMessage = styled(StyledText)`
color: ${(props) => props.theme.colors.ui.error}
align-self: center;
font-size: ${(props) => props.theme.fontSizes.title};
`;

export const ErrorImage = styled(Image)`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;
