import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { CarInfo, getCarInfo } from "@/api/getCarInfo";
import { useNotificationContext } from "@/providers/NotificationProvider";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import KeyValue from "@/components/KeyValue";
import Divider from "@/components/Divider";
import { Colors } from "@/constants/Colors";
import {
  faCity,
  faHashtag,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import CircleLoader from "@/components/CircleLoader";

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

  console.log(carInfo, "carinfo");

  useEffect(() => {
    if (carInfo) {
      return;
    }

    const fetchCarInfo = async () => {
      try {
        let image;

        if (imagePickMethod === "gallery") {
          image = await launchImageLibraryAsync(options);
        } else if (imagePickMethod === "camera") {
          image = await launchCameraAsync(options);
        }

        if (image) {
          setIsLoading(true);
          const info = await getCarInfo(image);
          setCarInfo(info);
        }
      } catch (err) {
        setNotification(err.message, "error");
        router.push({
          pathname: "/",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarInfo();
  }, [imagePickMethod]);

  if (isLoading) {
    return <CircleLoader />;
  }

  if (!carInfo) {
    return <ThemedView style={{ height: "100%", width: "100%" }} />;
  }

  const lastOperation = carInfo.operations[0];

  return (
    <ThemedView
      style={{ paddingVertical: 50, paddingHorizontal: 20, height: "100%" }}
    >
      <Image source={{ uri: carInfo.photo_url }} style={styles.image} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.backgroundSecondary },
        ]}
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
        <View>
          <KeyValue
            label="Колір"
            value={lastOperation.color.ua}
            prefixIcon={faPalette}
          />
          <KeyValue label="VIN" value={carInfo.vin} prefixIcon={faHashtag} />
          <KeyValue
            label="Регіон"
            value={carInfo.region.name_ua}
            prefixIcon={faCity}
          />
        </View>
        <Divider />
        <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
          Інформація про угон
        </ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{
            textAlign: "center",
            color: carInfo.is_stolen
              ? Colors.semantic.negative
              : Colors.semantic.positive,
          }}
        >
          {carInfo.is_stolen
            ? "Автомобіль знаходиться в угоні"
            : "Автомобіль не знаходиться в угоні"}
        </ThemedText>
        <Divider />
        <ThemedText type="defaultSemiBold">Остання операція</ThemedText>
        <KeyValue label="Операція" value={lastOperation.operation.ua} />
        <KeyValue
          label="Проведена в департаменті"
          value={lastOperation.department}
        />
        <KeyValue label="Дата" value={lastOperation.registered_at} />
        <KeyValue label="Адреса власника" value={lastOperation.address} />
      </ScrollView>
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
    gap: 10,
  },
  digits_container: {
    backgroundColor: "#c8dee6",
    padding: 5,
    borderRadius: 5,
  },
});
