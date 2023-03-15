import React from "react";
import Navigator from "./src/helpers/navigator/navigator.helper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { loadFonts } from "./src/helpers/typography/load-fonts.helper";

export default function App() {
  const fontsLoaded = loadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
