import { TransitionPresets } from "@react-navigation/stack";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hasNotch } from "react-native-device-info";

export default function bottombarDefaultConfig(
  { navigation, route },
  headerRight
) {
  const { top } = useSafeAreaInsets();
  const [defaultConfig, setDefaultConfig] = useState({
    ...TransitionPresets.SlideFromRightIOS,
    activeTintColor: "#ff0000",
    style: {
      height: hasNotch ? 75 : 70,
    },
    tabStyle: {
      backgroundColor: "white",
      height: hasNotch ? 75 : 70,
    },
    labelStyle: {
      fontSize: 12,
      lineHeight: 14,
      marginBottom: hasNotch ? 15 : 10,
    },
  });

  return defaultConfig;
}
