import { TextProps } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
  emojis: Emoji[];
  style?: TextProps["style"];
}

export default function EmojiText(props: Props) {
  const { emojis, style } = props;

  return (
    <ThemedText
      style={[
        { fontSize: 32, lineHeight: 45 },
        style,
        { fontFamily: "NotoColorEmoji" },
      ]}
    >
      {emojis.map((emoji, i) => {
        return String.fromCodePoint(...emoji.base);
      })}
    </ThemedText>
  );
}
