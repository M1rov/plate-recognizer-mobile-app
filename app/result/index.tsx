import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { CarInfo, getCarInfo } from "@/api/getCarInfo";
import { useNotificationContext } from "@/providers/NotificationProvider";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import KeyValue from "@/components/KeyValue";
import Divider from "@/components/Divider";

const options = {
  mediaType: "photo",
  base64: true,
};

export default function ResultPage() {
  const [carInfo, setCarInfo] = useState<CarInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { setNotification } = useNotificationContext();

  const { imagePickMethod } = useLocalSearchParams();
  const router = useRouter();

  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");

  console.log(carInfo, "carinfo");

  useEffect(() => {
    if (carInfo) {
      return;
    }
    try {
      if (imagePickMethod === "gallery") {
        launchImageLibraryAsync(options)
          .then((image) => {
            setIsLoading(true);
            return getCarInfo(image);
          })
          .then(setCarInfo)
          .finally(() => setIsLoading(false));
      }
      if (imagePickMethod === "camera") {
        launchCameraAsync(options)
          .then((image) => {
            setIsLoading(true);
            return getCarInfo(image);
          })
          .then(setCarInfo)
          .finally(() => setIsLoading(false));
      }
    } catch (err) {
      setNotification("Something went wrong!", "error");
      console.error(err.message);
      router.push({
        pathname: "/",
      });
    }
  }, [imagePickMethod]);

  if (!carInfo) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const lastOperation = carInfo.operations[0];

  return (
    <ThemedView
      style={{ paddingTop: 50, paddingHorizontal: 20, height: "100%" }}
    >
      <Image source={{ uri: carInfo.photo_url }} style={styles.image} />
      <ThemedView
        style={[styles.container, { backgroundColor: backgroundSecondary }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <ThemedText type="subtitle">{carInfo.vendor}</ThemedText>
            <ThemedText type="subtitle">{carInfo.model}</ThemedText>
            <ThemedText type="subtitle">{carInfo.model_year}</ThemedText>
          </View>
          <View style={styles.digits_container}>
            <ThemedText type="subtitle" style={{ color: "black" }}>
              {carInfo.digits}
            </ThemedText>
          </View>
        </View>
        <Divider />
        <KeyValue label="Колір" value={lastOperation.color.ua} />
        <ThemedText>VIN: {carInfo.vin}</ThemedText>
        <ThemedText>Region: {carInfo.region.name_ua}</ThemedText>
        <ThemedText>Is Stolen: {carInfo.is_stolen ? "Yes" : "No"}</ThemedText>
        <ThemedText>Operation: {lastOperation.operation.ua}</ThemedText>
        <ThemedText>Address: {lastOperation.address}</ThemedText>
        <ThemedText>Department: {lastOperation.department}</ThemedText>
        <ThemedText>Is Last: {lastOperation.is_last ? "Yes" : "No"}</ThemedText>
        <ThemedText>Registered At: {lastOperation.registered_at}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 20,
  },
  operationContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  container: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "gray",
  },
  digits_container: {
    backgroundColor: "#c8dee6",
    padding: 5,
    borderRadius: 5,
  },
});
