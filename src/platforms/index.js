import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import Device from "react-native-device-detection";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const isTablet =
  Device.isTablet ||
  DeviceInfo.isTablet() ||
  DeviceInfo.getDeviceType() == "Tablet" ||
  "CMR-AL09, CMR-W09, SHT-AL09, SHT-W09, AGS-W09, AGS-L09, AGS-L03, AGS2-W09, AGS2-W19, AGS2-L09, BAH2-L09, BAH2-W09, BAH2-W19, CMR-AL19, CMR-W19".includes(
    DeviceInfo.getModel()
  );
