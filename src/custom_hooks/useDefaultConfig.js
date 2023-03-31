import { TransitionPresets } from "@react-navigation/stack";
import React, { useState } from "react";
import { hasNotch } from "react-native-device-info";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackHeader from "../components/BackHeader";
import { isIOS } from "../platforms";
import { horizontal } from "../scales";
import { useDispatch } from "react-redux";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function useDefaultConfig({ navigation, route }, headerRight) {
  const routeName = getFocusedRouteNameFromRoute(route);
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  /**
   * Click button headerRight.
   */
  // const onHeaderRight = () => {
  //   dispatch({
  //     type: Actions.IS_SHOW_CALL,
  //     data: true,
  //   });
  // };
  const [defaultConfig, setDefaultConfig] = useState({
    ...TransitionPresets.SlideFromRightIOS,
    headerTitleStyle: {
      textAlign: "center",
    },
    headerTitleStyle: {
      textAlign: "center",
      textAlignVertical: "center",
      alignSelf: "center",
      fontWeight: "bold",
      fontSize: 16,
      paddingHorizontal: horizontal(5),
    },
    headerStyle: {
      backgroundColor: "white",
      height: isIOS && hasNotch() ? 85 : 60,
    },
    headerTintColor: "#ff6f00",
    headerLeft: () => <BackHeader {...navigation} />,
    headerRight: () => (
      <TouchableOpacity
        style={{ right: horizontal(15) }}
        onPress={onHeaderRight}
      >
        <Image
          source={require("../assets/icon/share.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    ),
  });

  return defaultConfig;
}
