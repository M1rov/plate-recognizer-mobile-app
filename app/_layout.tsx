import { Stack } from "expo-router";
import { NotificationProvider } from "@/providers/NotificationProvider";

export default function RootLayout() {
  return (
    <NotificationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="result/index" />
      </Stack>
    </NotificationProvider>
  );
}
