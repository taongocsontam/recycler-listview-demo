import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

function Controls() {
  const { toggleWebcam, toggleMic, startHls, stopHls, hlsState } = useMeeting(
    {}
  );

  const _handleHLS = async () => {
    if (!hlsState || hlsState === "HLS_STOPPED") {
      startHls({
        layout: {
          type: "SPOTLIGHT",
          priority: "PIN",
          gridSize: 4,
        },
        theme: "DARK",
        orientation: "portrait",
      });
    } else if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
      stopHls();
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          toggleWebcam();
        }}
        buttonText={"Toggle Webcam"}
        backgroundColor={"#1178F8"}
      />
      <Button
        onPress={() => {
          toggleMic();
        }}
        buttonText={"Toggle Mic"}
        backgroundColor={"#1178F8"}
      />
      {hlsState === "HLS_STARTED" ||
      hlsState === "HLS_STOPPING" ||
      hlsState === "HLS_STARTING" ||
      hlsState === "HLS_PLAYABLE" ? (
        <Button
          onPress={() => {
            _handleHLS();
          }}
          buttonText={
            hlsState === "HLS_STARTED"
              ? `Live Starting`
              : hlsState === "HLS_STOPPING"
              ? `Live Stopping`
              : hlsState === "HLS_PLAYABLE"
              ? `Stop Live`
              : `Loading...`
          }
          backgroundColor={"#FF5D5D"}
        />
      ) : (
        <Button
          onPress={() => {
            _handleHLS();
          }}
          buttonText={`Go Live`}
          backgroundColor={"#1178F8"}
        />
      )}
    </View>
  );
}

export default Controls;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
