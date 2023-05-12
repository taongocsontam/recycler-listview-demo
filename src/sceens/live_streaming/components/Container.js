import { Constants, useMeeting } from "@videosdk.live/react-native-sdk";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SpeakerView from "./SpeakerView";
import ViewerView from "./ViewerView";
import Button from "./Button";

function Container() {
  const { join, changeWebcam, localParticipant } = useMeeting({
    onError: (error) => {
      console.log(error.message);
    },
  });
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      // We will pin the local participant if he joins in CONFERENCE mode
      if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
    },
  });

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  return (
    <View style={styles.container}>
      {localParticipant?.mode == Constants?.modes.CONFERENCE ? (
        <SpeakerView />
      ) : localParticipant?.mode == Constants?.modes.VIEWER ? (
        <ViewerView />
      ) : (
        <View style={styles.viewBlack}>
          <Text style={{ fontSize: 20, color: "white" }}>
            Press Join button to enter studio.
          </Text>
          <Button
            btnStyle={styles.btnJoin}
            buttonText={"Join"}
            onPress={() => {
              join();
              setTimeout(() => {
                changeWebcam();
              }, 300);
            }}
          />
        </View>
      )}
    </View>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBlack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  btnJoin: {
    marginTop: 8,
    paddingHorizontal: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
  },
});
