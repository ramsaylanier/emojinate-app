import { PropsWithChildren } from "react";
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface Props extends PropsWithChildren {
  direction?: "row" | "column";
  gap?: number;
  justify?: FlexStyle["justifyContent"];
  align?: FlexStyle["alignItems"];
  style?: StyleProp<ViewStyle>;
}

export default function Flex(props: Props) {
  const { children, direction = "column", gap = 0 } = props;

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          gap: gap,
          alignItems: props.align,
          justifyContent: props.justify,
        },
        props.style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});
