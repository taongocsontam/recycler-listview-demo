import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { hasNotch } from "react-native-device-info";
import bottombarDefaultConfig from "../../custom_hooks/bottombarDefaultConfig";
import Constants from "../../constants";
import { HomeStack } from "./HomeStack";
import HomeActiveIcon from "../../assets/home/home_active";
import HomeInActiveIcon from "../../assets/home/home_inactive";
import ProfileActiveIcon from "../../assets/profile/profile_active";
import ProfileInActiveIcon from "../../assets/profile/profile_inactive";
import { ProfileStack } from "./ProfileStack";
import { isIOS } from "../../platforms";
import globalStyles from "../../globalStyles";

const BottomTab = createBottomTabNavigator();

export const TabNavigator = (props) => {
  const defaultConfig = bottombarDefaultConfig(props);
  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    if (isIOS) return;
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowTab(false);
  };

  const _keyboardDidHide = () => {
    setShowTab(true);
  };
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FD7A59",
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 14,
          marginBottom: hasNotch() && isIOS ? 15 : 5,
        },

        tabBarItemStyle: {
          backgroundColor: "white",
          height: hasNotch() && isIOS ? 75 : 40,
        },
        tabBarStyle: showTab ? styles.tabbar : [styles.tabbar, { bottom: -75 }],
      }}
    >
      <BottomTab.Screen
        name={Constants.HOMESTACK}
        component={HomeStack}
        options={{
          title: Constants.HOME_TITLE,
          tabBarIcon: ({ focus }) => {
            focus ? (
              <View style={globalStyles.containIconTab}>
                <HomeActiveIcon />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <View style={globalStyles.emptyTabbar} />
                <HomeInActiveIcon />
              </View>
            );
          },
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
      <BottomTab.Screen
        name={Constants.PROFILESTACK}
        component={ProfileStack}
        options={{
          title: Constants.PROFILE_TITLE,
          tabBarIcon: ({ focus }) => {
            focus ? (
              <View style={globalStyles.containIconTab}>
                <ProfileActiveIcon />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <View style={globalStyles.emptyTabbar} />
                <ProfileInActiveIcon />
              </View>
            );
          },
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "white",
    height: hasNotch() && isIOS ? 75 : 60,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
    zIndex: 1,
  },
});
