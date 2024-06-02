import {
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
} from "expo-image-picker";
import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: "https://9b2c-213-110-143-76.ngrok-free.app",
});

interface CarOperation {
  is_last: boolean;
  registered_at: string;
  operation: {
    ua: string;
  };
  department: string;
  color: {
    ua: string;
  };
  address: string;
}

export interface CarInfo {
  digits: string;
  vin: string;
  vendor: string;
  model: string;
  model_year: number;
  region: {
    name_ua: string;
  };
  photo_url: string;
  is_stolen: boolean;
  operations: CarOperation[];
}

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
    console.error("Error during request", error.message, error.response?.data);
    throw error; // Re-throw the error to be caught by the caller
  }
}
