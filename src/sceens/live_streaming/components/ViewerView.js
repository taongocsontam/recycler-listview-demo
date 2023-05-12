import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Video from "react-native-video";
import HeaderView from "./HeaderView";

function ViewerView({}) {
  const { hlsState, hlsUrls } = useMeeting();

  return (
    <SafeAreaView style={styles.container}>
      {hlsState == "HLS_PLAYABLE" ? (
        <>
          {/* Render Header for copy meetingId and leave meeting*/}
          <HeaderView />

          {/* Render VideoPlayer that will play `downstreamUrl`*/}
          <Video
            controls={true}
            source={{
              uri: hlsUrls.downstreamUrl,
            }}
            resizeMode={"stretch"}
            style={{
              flex: 1,
              backgroundColor: "black",
            }}
            onError={(e) => console.log("error", e)}
          />
        </>
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            HLS is not started yet or is stopped
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

export default ViewerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  viewVideo: {},
});
