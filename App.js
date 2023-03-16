import React from "react";
import Navigator from "./src/helpers/navigator/navigator.helper";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { useCustomFonts } from "./src/helpers/typography/useCustomFonts.helper";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsContextProvider>
          <Navigator />
        </RestaurantsContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
