import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface Props {
  label: string;
  value: string;
}

export default function KeyValue({ label, value }: Props) {
  return (
    <View>
      <ThemedText
        darkColor="#b9c1c4"
        lightColor="#8d9699"
        type="defaultSemiBold"
      >
        {label}
      </ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}
