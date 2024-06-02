import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

export default function MainMenu() {
  const router = useRouter();

  useEffect(() => {
    requestCameraPermissionsAsync();
    requestMediaLibraryPermissionsAsync();
  }, []);

  const handleGalleryClick = async () => {
    router.push({
      pathname: "result",
      params: { imagePickMethod: "gallery" },
    });
  };

  const handleCameraClick = async () => {
    router.push({
      pathname: "result",
      params: { imagePickMethod: "camera" },
    });
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: "center",
        gap: 10,
      }}
    >
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText type="title">Вітаємо!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText style={{ textAlign: "center" }}>
        У цьому застосунку Ви можете отримати інформацію про автомобіль,
        зробивши фото, де видно його номерні знаки!
      </ThemedText>
      <ThemedText type="subtitle">Спробуйте самі:</ThemedText>
      <ThemedButton
        icon={faImage}
        text="Завантажити з галереї"
        onPress={handleGalleryClick}
      />
      <ThemedButton
        icon={faCamera}
        text="Відкрити камеру"
        onPress={handleCameraClick}
      />
    </ThemedView>
  );
}
