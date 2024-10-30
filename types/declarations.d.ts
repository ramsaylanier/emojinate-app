type Emoji = {
  base: number[];
  shortcodes: string[];
};

type EmojiGroup = {
  group: string;
  emoji: Emoji[];
};

declare module "@/emoji.json" {
  const content: EmojiGroup[];
  export default content;
}

type ThemeColor =
  | (keyof typeof Colors.light & keyof typeof Colors.dark)
  | "transparent";

type StyleFunction = (props: any) => ViewStyle | TextStyle | ImageStyle;
