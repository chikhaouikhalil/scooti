import "expo-dev-client";
import "./firebase";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "./globalStyles";
import { StatusBar as Sbar, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, theme } from "native-base";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/Kanit-Bold.ttf"),
    Medium: require("./assets/fonts/Kanit-Medium.ttf"),
    Regular: require("./assets/fonts/Kanit-Regular.ttf"),
    Light: require("./assets/fonts/Kanit-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const token = await AsyncStorage.getItem("access_token");
      const userFromStorage = await AsyncStorage.getItem("user");
      const user = userFromStorage != null ? JSON.parse(userFromStorage) : null;
      console.log("token est ", token);
      console.log("user est ", user);
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <View
        style={{ flex: 1, backgroundColor: colors.lightYellow }}
        onLayout={onLayoutRootView}
      >
        {/** status bar for android || ios */}
        {Platform.OS == "android" ? (
          <Sbar backgroundColor="#ACBB72" />
        ) : (
          <StatusBar style="dark" backgroundColor="#ACBB72" />
        )}
        <Navigation />
      </View>
    </NativeBaseProvider>
  );
}
