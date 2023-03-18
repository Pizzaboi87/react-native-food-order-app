import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";
import { StyledText } from "../../helpers/typography/text.helper";

export const FavouritesWrapper = styled.View`
  padding: 10px;
`;

export const CardBox = styled.View`
  margin-right: 10px;
`;

export const Title = styled(StyledText)`
  font-size: ${theme.fontSizes.body};
  color: ${theme.colors.ui.brand};
`;
