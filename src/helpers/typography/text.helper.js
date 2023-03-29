import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const lightCaption = (theme) => `
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.caption};
`;

const title = (theme) => `
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeights.bold};

`;

const variants = {
  body,
  label,
  caption,
  lightCaption,
  error,
  hint,
  title,
};

export const StyledText = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

StyledText.defaultProps = {
  variant: "body",
};
