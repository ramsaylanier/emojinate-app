import { useThemeColors } from "@/hooks/useThemeColors";
import Flex from "@/components/Flex";
import { Alert, Switch } from "react-native";

import Slider from "@react-native-community/slider";
import emoji from "@/emoji.json";

import { StyleSheet } from "@/types/stylesheet";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/state/store";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default observer(function Settings() {
  const store = useStore();
  const { emojiLength } = store;
  const themeColors = useThemeColors();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      // Do something
      try {
        store.saveSettings();
      } catch (err: any) {
        console.log({ err });
        Alert.alert("Error", err.message);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      colors={[themeColors.background, themeColors.secondary]}
      start={{ x: -0.5, y: 0 }}
      end={{ x: 1.5, y: 1.5 }}
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <ScrollView style={styles.emojiContainer(themeColors)}>
        <Flex
          direction="column"
          align="stretch"
          justify="center"
          style={{ padding: 20 }}
          gap={20}
        >
          <Flex gap={10} style={{ marginTop: 20 }}>
            <ThemedText type="subtitle">Emoji Count - {emojiLength}</ThemedText>
            <Slider
              style={styles.slider(themeColors)}
              value={emojiLength}
              onValueChange={(value) => store.setEmojiLength(value)}
              minimumValue={3}
              step={1}
              maximumValue={30}
              maximumTrackTintColor={themeColors.secondary}
              minimumTrackTintColor={themeColors.primary}
            />
          </Flex>

          <Flex gap={10}>
            <ThemedText type="subtitle">Emoji Groups</ThemedText>

            <Flex gap={5}>
              {store.emojiGroupNames.map((name) => {
                const isExcluded = store.excludedGroups.includes(name);
                const e = emoji.find((g) => g.group === name)?.emoji[0];
                return (
                  <Flex key={name} direction="row" justify="space-between">
                    <ThemedText>{name}</ThemedText>

                    <Flex direction="row" align="center" gap={10}>
                      <ThemedText>
                        {e && String.fromCodePoint(...e.base)}
                      </ThemedText>
                      <Switch
                        value={!isExcluded}
                        onValueChange={() => store.toggleEmojiGroup(name)}
                        trackColor={{
                          false: themeColors.secondary,
                          true: themeColors.primary,
                        }}
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>
    </LinearGradient>
  );
});

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
    backgroundColor: themeColors.secondary,
    padding: 10,
  }),
  input: (themeColors) => ({
    maxHeight: "100%",
    padding: 10,
    backgroundColor: themeColors.background,
    color: "white",
  }),
  button: (themeColors) => ({
    padding: 10,
    backgroundColor: themeColors.primary,
    borderRadius: 20,
    textAlign: "center",
  }),
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  slider: (themeColors) => ({
    width: "100%",
    color: themeColors.primary,
  }),
  groupButton: (backgroundColor) => ({
    padding: 5,
    backgroundColor: backgroundColor,
  }),
});
