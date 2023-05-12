import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingVal, setMeetingVal] = useState("");

  const JoinButton = ({ value, onPress }) => (
    <TouchableOpacity style={styles.btnJoin} onPress={onPress}>
      <Text style={styles.textBtn}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="XXX-XXX-XXX"
        placeholderTextColor={"gray"}
        onChangeText={setMeetingVal}
        value={meetingVal}
      />
      <JoinButton
        value={"Join as Host"}
        onPress={() => {
          getMeetingAndToken(meetingVal);
        }}
      />
      <JoinButton
        value={"Join as Viewer"}
        onPress={() => {
          setMode("VIEWER");
          getMeetingAndToken(meetingVal);
        }}
      />
      <Text style={styles.textLine}>---------- OR ----------</Text>
      <JoinButton
        value={"Create studio room"}
        onPress={() => {
          getMeetingAndToken();
        }}
      />
    </SafeAreaView>
  );
}

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingHorizontal: 6 * 10,
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 6,
    color: "white",
    marginBottom: 16,
  },
  textLine: {
    alignSelf: "center",
    fontSize: 22,
    marginVertical: 16,
    fontStyle: "italic",
    color: "grey",
  },
  btnJoin: {
    backgroundColor: "#1178F8",
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
  },
  textBtn: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
  },
});
