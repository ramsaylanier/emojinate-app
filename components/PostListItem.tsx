import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { ThemedText } from "./ThemedText";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import Flex from "./Flex";
import { Pressable, RectButton } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "@/types/stylesheet";
import { Post, useStore } from "@/state/store";
import EmojiText from "./EmojiText";
import CustomAlert from "./CustomAlert";
import { useWindowDimensions } from "react-native";

interface Props {
  post: Post;
}

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

type LeftActionsProps = {
  dragX: SharedValue<number>;
  swipeableRef: React.RefObject<SwipeableMethods>;
};

const RightAction = ({ dragX, swipeableRef }: LeftActionsProps) => {
  const themeColors = useThemeColors();

  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      dragX.value,
      [0, -width / 2],
      [0, 1],
      Extrapolation.CLAMP
    ),
    backgroundColor: interpolateColor(
      dragX.value,
      [0, -100],
      [themeColors.secondary, themeColors.error]
    ),
  }));
  return (
    <AnimatedRectButton
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "transparent",
          paddingRight: 12,
        },
        animatedStyle,
      ]}
      onPress={() => swipeableRef.current!.close()}
    >
      <Ionicons name="trash-outline" size={24} color={themeColors.text} />
    </AnimatedRectButton>
  );
};

const renderRightActions = (
  _progress: any,
  translation: SharedValue<number>,
  swipeableRef: React.RefObject<SwipeableMethods>
) => <RightAction dragX={translation} swipeableRef={swipeableRef} />;

export default observer(function PostListItem(props: Props) {
  const store = useStore();
  const { post } = props;
  const swipeableRef = useRef<SwipeableMethods>(null);
  const swipeableRow = useRef<SwipeableMethods>(null);
  const themeColors = useThemeColors();
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(_, progress) =>
        renderRightActions(_, progress, swipeableRow)
      }
      onSwipeableWillOpen={(direction) => {
        if (direction === "right") {
          setAlertOpen(true);
        }
      }}
    >
      <Pressable
        onPress={() => {
          router.navigate({
            pathname: `/post/[id]`,
            params: { id: post.id },
          });
        }}
      >
        <LinearGradient
          style={styles.listItem(themeColors)}
          colors={[themeColors.primary, themeColors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Flex gap={10}>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <ThemedText type="subtitle" style={styles.title}>
                {post.name}
              </ThemedText>

              <ThemedText>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                })}
              </ThemedText>
            </Flex>
            <EmojiText emojis={post.emoji} style={styles.emoji} />
          </Flex>
        </LinearGradient>
        <CustomAlert
          isOpen={alertOpen}
          onClose={() => {
            setAlertOpen(false);
            swipeableRef?.current?.close();
          }}
          onAlertPassed={function (): void {
            store.deletePost(post.id);
          }}
          text={"Are you sure you want to delete this story?"}
        />
      </Pressable>
    </Swipeable>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 3,
  },
  listItem: (themeColors) => ({
    borderRadius: 5,
    backgroundColor: themeColors.background,
    padding: 10,
  }),
  title: {
    flex: 1,
  },
  emoji: {
    width: "100%",
    flexWrap: "wrap",
    fontSize: 22,
  },
});
