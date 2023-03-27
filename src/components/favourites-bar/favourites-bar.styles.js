import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";

export const FavouritesWrapper = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
`;

export const CardBox = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
`;

export const Title = styled(StyledText)`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.text};
`;
