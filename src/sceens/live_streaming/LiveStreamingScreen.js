import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  MediaStream,
  RTCView,
  Constants,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, getTokenVideoSDK } from "../../api/videosdk/api";
import JoinScreen from "./components/JoinScreen";
import Container from "./components/Container";

function LiveStreamingScreen() {
  const [meetingId, setMeetingId] = useState();
  const [token, setToken] = useState();
  const [mode, setMode] = useState("CONFERENCE");

  const   getMeetingAndToken = async (id) => {
    const token = await getTokenVideoSDK();
    const meetingId = id == null ? await createMeeting({ token: token }) : id;
    setToken(token);
    setMeetingId(meetingId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {meetingId && token ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "SonTN",
            mode: mode,
          }}
          token={token}
        >
          <Container />
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
      )}
    </SafeAreaView>
  );
}

export default LiveStreamingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
