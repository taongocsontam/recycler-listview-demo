import React from "react";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { Clipboard, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import Toast from "react-native-simple-toast";

function HeaderView() {
  const { meetingId, leave } = useMeeting();
  return (
    <View style={styles.container}>
      <Text style={styles.textMeetingId}>{meetingId}</Text>
      <Button
        btnStyle={styles.copyMeetId}
        onPress={() => {
          Clipboard.setString(meetingId);
          Toast.show("MeetingId copied successfully", Toast.SHORT);
        }}
        buttonText={"Copy MeetingId"}
        backgroundColor={"transparent"}
      />
      <Button
        onPress={() => {
          leave();
        }}
        buttonText={"Leave"}
        backgroundColor={"#FF0000"}
      />
    </View>
  );
}

export default HeaderView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textMeetingId: {
    fontSize: 24,
    color: "white",
  },
  copyMeetId: {
    borderWidth: 1,
    borderColor: "white",
  },
});
