import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { AuthContext } from "../../context";
import usePanResponder from "../../custom_hooks/usePanResponder";

const ImageDetail = () => {
  const imageUrl =
    "https://avatars2.githubusercontent.com/u/22999030?s=460&v=4";
  const [heads, panResponder] = usePanResponder(imageUrl);

  return (
    <View style={styles.container}>
      {heads.map((item, index, items) => {
        const pan = index === items.length - 1 ? panResponder.panHandlers : {};
        return (
          <Animated.Image
            key={index}
            {...pan}
            style={[
              styles.head,
              // {
              //   transform: item.animation.getTranslateTransform(),
              // },
            ]}
            source={{ uri: item.image }}
          />
        );
      })}
    </View>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#ecf0f1",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
