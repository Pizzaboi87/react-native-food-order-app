import React from "react";
import { Navigation } from "./src/infrastructure/navigation";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { Provider } from "react-native-paper";
import { useCustomFonts } from "./src/helpers/typography/useCustomFonts.helper";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

export default function App() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider>
          <AuthenticationContextProvider>
            <Navigation />
          </AuthenticationContextProvider>
        </Provider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
