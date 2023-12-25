import FontAwesome from "@expo/vector-icons/FontAwesome";
import NetInfo from "@react-native-community/netinfo";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { onlineManager } from "@tanstack/react-query";
import { FontSource, useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { QueryProvider } from "../src/api";
import OnBoardingScreen from "./(screen)/OnBoarding";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono:
      require("../src/assets/fonts/SpaceMono-Regular.ttf") as FontSource,
    ...FontAwesome.font,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)  

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {isLoggedIn && loaded ? <RootLayoutNav /> : <OnBoardingScreen />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </QueryProvider>
  );
}
