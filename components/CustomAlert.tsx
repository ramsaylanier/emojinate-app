import { ThemedText } from "./ThemedText";
import ThemedButton from "./ThemedButton";
import { StyleSheet } from "@/types/stylesheet";
import { Modal, View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import Flex from "./Flex";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAlertPassed: () => void;
  text: string;
}

export default function CustomAlert(props: Props) {
  const { isOpen, onAlertPassed, onClose, text } = props;
  const { background, text: textColor } = useThemeColors();

  return (
    <Modal animationType="fade" visible={isOpen}>
      <View style={[styles.container(background)]}>
        <Flex
          style={{ maxWidth: 300, backgroundColor: background, padding: 20 }}
          align="center"
          justify="center"
          gap={20}
        >
          <ThemedText style={{ color: textColor }}>{text}</ThemedText>

          <Flex
            direction="row"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <ThemedButton color="secondary" onPress={onClose}>
              <ThemedText>Cancel</ThemedText>
            </ThemedButton>

            <ThemedButton color="primary" onPress={onAlertPassed}>
              <ThemedText>Yes</ThemedText>
            </ThemedButton>
          </Flex>
        </Flex>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: (background) => ({
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: background,
  }),
});
