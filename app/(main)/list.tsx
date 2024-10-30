import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet } from "@/types/stylesheet";
import Animated from "react-native-reanimated";
import { useStore } from "@/state/store";
import { observer } from "mobx-react-lite";
import { LinearGradient } from "expo-linear-gradient";
import PostListItem from "@/components/PostListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default observer(function List() {
  const store = useStore();
  const themeColors = useThemeColors();

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={[themeColors.background, themeColors.secondary]}
        style={[styles.container, { backgroundColor: themeColors.background }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 1 }}
      >
        <Animated.FlatList
          data={store.postsByDate}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <PostListItem key={item.id} post={item} />}
        />
      </LinearGradient>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    overflow: "hidden",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  listItem: (themeColors) => ({
    borderRadius: 5,
    backgroundColor: themeColors.background,
    padding: 10,
    gap: 10,
    display: "flex",
    flexDirection: "column",
  }),
  title: {
    flex: 1,
  },
  emoji: {
    flexWrap: "wrap",
    fontSize: 22,
  },
});
