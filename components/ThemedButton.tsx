import { Pressable, PressableProps, ViewProps } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { PropsWithChildren, useEffect, useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet } from "@/types/stylesheet";

export type ThemedButtonProps = PressableProps &
  PropsWithChildren & {
    duration?: number;
    color?: string;
    style?: ViewProps["style"];
  };

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

export default function ThemedButton({
  duration = 300,
  color = "primary",
  style = {},
  children,
  ...rest
}: ThemedButtonProps) {
  const [hovered, setHovered] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (hovered) {
      progress.value = withTiming(1, { duration: duration });
    } else {
      progress.value = withTiming(0, { duration: duration });
    }
  }, [hovered]);

  const themeColors = useThemeColors();

  return (
    <AnimatedButton
      {...rest}
      onHoverIn={() => setHovered(true)}
      onPressIn={() => setHovered(true)}
      onPressOut={() => setHovered(false)}
      onHoverOut={() => setHovered(false)}
      style={[styles.button(themeColors[color] || color), style]}
    >
      {children}
    </AnimatedButton>
  );
}

const styles = StyleSheet.create({
  button: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    padding: 10,
    borderRadius: 3,
  }),
});
