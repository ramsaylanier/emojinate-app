import EmojiText from "@/components/EmojiText";
import Flex from "@/components/Flex";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useStore } from "@/state/store";
import { StyleSheet } from "@/types/stylesheet";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useGlobalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite";
import { ScrollView } from "react-native";

export default observer(function Post() {
  const themeColors = useThemeColors();
  const store = useStore();
  const { id } = useGlobalSearchParams();

  const post = store.posts.find((p) => p.id === Number(id));

  if (!post) {
    return null;
  }

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.secondary]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: "",
          animation: "slide_from_right",
        }}
      />

      <Flex gap={20} style={styles.flex}>
        <ThemedText type="title">{post.name}</ThemedText>

        <EmojiText emojis={post.emoji} />

        <ScrollView style={styles.content(themeColors)}>
          <ThemedText type="default">{post.content}</ThemedText>
        </ScrollView>
      </Flex>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flex: {
    height: "100%",
  },
  content: (themeColors) => ({
    padding: 10,
    flex: 1,
    backgroundColor: themeColors.background,
  }),
});
