import { useThemeColors } from "@/hooks/useThemeColors";
import Flex from "@/components/Flex";
import { Alert, Pressable, useWindowDimensions } from "react-native";
import { StyleSheet } from "@/types/stylesheet";
import { ThemedText } from "@/components/ThemedText";

import { useState } from "react";
import { RefreshControl, ScrollView, TextInput } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useStore } from "@/state/store";

import EmojiList from "@/components/EmojiList";
import { LinearGradient } from "expo-linear-gradient";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function Index() {
  const store = useStore();
  const themeColors = useThemeColors();

  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();

  const { width } = useWindowDimensions();

  const startX = useSharedValue(0);

  const handleSave = async () => {
    try {
      await store.addPost(name, text);
      Alert.alert("Success", "Post saved!");
      setName("");
      setText("");
      store.resetEmojis();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const pan = Gesture.Pan()
    .onStart((e) => {
      startX.value = e.absoluteX;
    })
    .onUpdate((e) => {
      const diff = e.absoluteX - startX.value;

      if (diff <= -width / 4) {
        router.navigate("/list");
      } else if (diff > width / 4) {
        router.navigate("/settings");
      }
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={"padding"}
        contentContainerStyle={styles.container}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[themeColors.primary, themeColors.secondary]}
          start={{ x: -0.5, y: 0 }}
          end={{ x: 1.5, y: 1.5 }}
        >
          <ScrollView
            style={styles.emojiContainer(themeColors)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  store.resetEmojis();
                  setRefreshing(false);
                }}
              />
            }
          >
            <EmojiList />
          </ScrollView>
        </LinearGradient>

        <GestureDetector gesture={pan}>
          <LinearGradient
            colors={[themeColors.background, themeColors.background]}
            start={{ x: -2, y: -1 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          >
            <Flex style={styles.inputContainer(themeColors)} gap={10}>
              <TextInput
                style={styles.input(themeColors)}
                multiline={false}
                onChange={(e) => setName(e.nativeEvent.text)}
                placeholder="Title"
                placeholderTextColor={themeColors.text}
                value={name}
              />

              <ScrollView>
                <TextInput
                  style={[styles.input(themeColors), { minHeight: 80 }]}
                  multiline={true}
                  numberOfLines={4}
                  onChange={(e) => setText(e.nativeEvent.text)}
                  placeholder="Story"
                  placeholderTextColor={themeColors.text}
                  value={text}
                />
              </ScrollView>
              <Pressable
                style={styles.button(themeColors)}
                onPress={handleSave}
              >
                <ThemedText style={styles.buttonText}>Save</ThemedText>
              </Pressable>
            </Flex>
          </LinearGradient>
        </GestureDetector>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    overflow: "hidden",
  },
  emojiContainer: (themeColors) => ({
    flexGrow: 0,
    flexShrink: 0,
  }),
  inputContainer: (themeColors) => ({
    height: "100%",
    zIndex: 1,
    flex: 1,
    padding: 10,
  }),
  input: (themeColors) => ({
    fontFamily: "NotoSans-Regular",
    maxHeight: "100%",
    verticalAlign: "top",
    padding: 10,
    backgroundColor: themeColors.background,
    color: themeColors.text,
    borderWidth: 1,
    borderColor: themeColors.primary,
    borderRadius: 5,
  }),
  button: (themeColors) => ({
    padding: 20,
    backgroundColor: themeColors.primary,
    borderRadius: 50,
    textAlign: "center",
  }),
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
