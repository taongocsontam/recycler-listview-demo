import { RTCView, useParticipant } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ParticipantView({ participantId }) {
  const { webcamStream, webcamOn } = useParticipant(participantId);
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={"cover"}
      style={styles.viewWebcam}
    />
  ) : (
    <View style={styles.viewNoWebcam}>
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  );
}

export default ParticipantView;

const styles = StyleSheet.create({
  viewWebcam: {
    height: 100,
    width: 100,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  viewNoWebcam: {
    backgroundColor: "grey",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
