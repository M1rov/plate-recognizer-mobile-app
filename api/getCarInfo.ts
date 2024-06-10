import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";
import axios from "axios";
import { CarInfo } from "@/interface/CarInfo";

const API = axios.create({
  baseURL: "https://fd06-213-110-143-76.ngrok-free.app",
});

export async function getCarInfo(
  imageResult: ImagePickerSuccessResult | ImagePickerCanceledResult,
): Promise<CarInfo> {
  if (imageResult.canceled) {
    throw Error("Ви не обрали фотографію.");
  }
  const fileUri = imageResult.assets[0].uri;
  const formData = new FormData();
  const fileType = imageResult.assets[0].type || "image/jpeg";

  formData.append("file", {
    uri: fileUri,
    type: fileType,
    name: "image.jpg",
  });
  console.log("before request", fileUri);
  try {
    const resp = await API.post("/car-info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("after request", resp.data);

    return resp.data;
  } catch (error) {
    throw Error(
      error.response?.data?.detail ??
        "Виникла помилка, спробуйте трохи пізніше!",
    ); // Re-throw the error to be caught by the caller
  }
}
