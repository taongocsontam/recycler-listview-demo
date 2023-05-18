import {
  MeetingConsumer,
  MeetingProvider,
} from "@videosdk.live/react-native-sdk";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Constants from "../../constants";
import colors from "../../styles/colors";
import MeetingContainer from "./MeetingContainer";

function MeetingScreen({ navigation, route }) {
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled;
  const webcamEnabled = route.params.webcamEnabled;
  const name = route.params.name;
  const meetingType = route.params.meetingType;
  console.log("params:  ", JSON.stringify(route.params));
  return (
    <SafeAreaView style={styles.container}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name: name,
          notification: {
            title: "Video SDK Meeting",
            message: "Meeting is running.",
          },
        }}
        token={token}
      >
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.navigate(Constants.CHAT_SCREEN);
            },
          }}
        >
          {() => {
            return (
              <MeetingContainer
                webcamEnabled={webcamEnabled}
                meetingType={meetingType}
              />
            );
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}

export default MeetingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[900],
    padding: 12,
  },
});
