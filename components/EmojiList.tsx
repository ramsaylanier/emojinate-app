import { useStore } from "@/state/store";
import { observer } from "mobx-react-lite";
import Flex from "./Flex";

import { StyleSheet } from "@/types/stylesheet";
import EmojiText from "./EmojiText";

export default observer(function EmojiList() {
  const store = useStore();
  const { visibleEmoji } = store;

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      style={styles.container}
    >
      <EmojiText emojis={visibleEmoji} style={styles.emoji} />
    </Flex>
  );
});

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    paddingVertical: 20,
  },
  emoji: {
    fontFamily: "NotoColorEmoji",
    lineHeight: 60,
  },
});
