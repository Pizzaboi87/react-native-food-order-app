import styled from "styled-components/native";
import { StyledText } from "../../helpers/typography/text.helper";

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled(StyledText)`
  margin-bottom: ${(props) => props.theme.sizes[4]}
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.bigTitle};
`;
