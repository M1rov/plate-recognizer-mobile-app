import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

interface Props {
  icon?: IconProp;
  text: string;
  onPress: () => void;
}

export const ThemedButton = ({ style, icon, text, onPress }: Props) => {
  const iconColor = Colors.icon;
  const color = Colors.text;
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.button]}>
      <ThemedView style={[styles.view, { borderColor: color }]}>
        {icon && <FontAwesomeIcon size={200} icon={icon} color={iconColor} />}
        <ThemedText type="button">{text}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    paddingHorizontal: 15,
    flex: 1,
  },
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 20,
    height: "100%",
    width: "100%",
  },
});
