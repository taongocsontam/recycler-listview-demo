import React, { useRef, useState } from "react";
import { View, Animated, PanResponder } from "react-native";

const usePanResponder = (imageUrl) => {
  const [heads, setHeads] = useState([
    {
      imageUrl: imageUrl,
      animations: new Animated.ValueXY(),
    },
    {
      imageUrl: imageUrl,
      animations: new Animated.ValueXY(),
    },
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        heads.map(({ imageUrl, animations }) => {
          animations.extractOffset(),
            animations.setValue({
              x: 0,
              y: 0,
            });
        });
      },
      onPanResponderMove: (event, gestureState) => {
        heads[0].animations.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
        heads.slice(1).map((item, index) => {
          Animated.sequence(Animated.delay(10 * index),
          Animated.spring(item.animations)).start();
        });
      },
      onPanResponderRelease: (event, gestureState) => {},
    })
  ).current;
  return [heads, panResponder];
};

export default usePanResponder;
