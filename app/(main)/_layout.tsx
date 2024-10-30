import { StoreContext, Store } from "@/state/store";
import { Link, Stack } from "expo-router";
import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useThemeColors } from "@/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import { StyleSheet } from "@/types/stylesheet";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default observer(function MainLayout() {
  const store = useMemo(() => new Store(), []);
  const { primary, secondary, background, icon } = useThemeColors();

  return (
    <StoreContext.Provider value={store}>
      <KeyboardProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: background,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "NotoSans-Regular",
              fontSize: 20,
              fontWeight: "bold",
              color: primary,
            },
            headerTintColor: primary,
            contentStyle: {
              backgroundColor: secondary,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Emojinate",
              headerLeft: (props) => {
                return (
                  <Link href="/settings">
                    <Ionicons name="settings" size={24} color={icon} />
                  </Link>
                );
              },
              headerTitle: () => {
                return (
                  <Image
                    source={require("@/assets/images/emojinate-logotype.png")}
                    resizeMode="cover"
                    style={styles.logo}
                  />
                );
              },
              headerRight: (props) => {
                return (
                  <Link href="/list">
                    <Ionicons name="list" size={24} color={icon} />
                  </Link>
                );
              },
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: "Settings",
              headerBackVisible: false,
              headerBackTitleVisible: false,
              animation: "slide_from_left",
              headerRight: () => {
                return (
                  <Link href="/">
                    <Ionicons name="arrow-forward" size={24} color={icon} />
                  </Link>
                );
              },
            }}
          />
          <Stack.Screen
            name="list"
            options={{
              title: "Stories",
              headerBackTitleVisible: false,
              animation: "slide_from_right",
              headerLeft: (props) => {
                return (
                  <Link href="/">
                    <Ionicons name="chevron-back" size={24} color={icon} />
                  </Link>
                );
              },
            }}
          />
        </Stack>
      </KeyboardProvider>
    </StoreContext.Provider>
  );
});

const styles = StyleSheet.create({
  logo: {
    height: 25,
    width: 120,
  },
});
