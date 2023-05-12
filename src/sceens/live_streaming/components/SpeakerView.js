import { Constants, useMeeting } from "@videosdk.live/react-native-sdk";
import React, { useMemo } from "react";
import { FlatList, SafeAreaView } from "react-native";
import HeaderView from "./HeaderView";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

function SpeakerView() {
  const { meetingId, participants } = useMeeting({});
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <HeaderView />
      {speakers.length > 0 ? (
        <FlatList
          data={speakers}
          renderItem={({ item }) => {
            return <ParticipantView participantId={item.id} />;
          }}
        />
      ) : null}
      <Controls />
    </SafeAreaView>
  );
}

export default SpeakerView;
