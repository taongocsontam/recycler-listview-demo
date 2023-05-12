import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/Button";
import Constants from "../../constants";
import Toast from "react-native-simple-toast";

function CallScreen({ navigation, route }) {
  const onCallGroup = () => {
    Toast.show("Cooming Soon", Toast.SHORT);
  };

  const onCallOneToOne = () => {
    navigation.navigate(Constants.CHAT_SCREEN);
  };

  const onLiveStreamingScreen = () => {
    navigation.navigate(Constants.LIVE_STREAMING_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Button onPress={onCallOneToOne} style={styles.btn}>
        <Text style={styles.textButton}>Call OneToOne</Text>
      </Button>
      <Button onPress={onCallGroup} style={styles.btn}>
        <Text style={styles.textButton}>Call Group</Text>
      </Button>
      <Button onPress={onLiveStreamingScreen} style={styles.btn}>
        <Text style={styles.textButton}>Live Streaming</Text>
      </Button>
    </View>
  );
}

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  btn: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
});
