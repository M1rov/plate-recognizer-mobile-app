import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "@/constants/Colors";

interface Props {
  label: string;
  value: string;
  prefixIcon?: IconProp;
}

export default function KeyValue({ label, value, prefixIcon }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      {prefixIcon && (
        <FontAwesomeIcon icon={prefixIcon} size={32} color={Colors.icon} />
      )}
      <View>
        <ThemedText color="#b9c4c7" style={{ lineHeight: 22 }}>
          {label}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{ lineHeight: 22 }}>
          {value ?? "Немає інформації"}
        </ThemedText>
      </View>
    </View>
  );
}
