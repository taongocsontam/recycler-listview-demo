import {
  ReactNativeForegroundService,
  useMeeting,
} from "@videosdk.live/react-native-sdk";
import React, { useEffect, useState } from "react";
import CallGroupViewer from "./CallGroup/CallGroup";
import OneToOneMeetingViewer from "./OneToOne";

export default function MeetingContainer({ webcamEnabled, meetingType }) {
  const [isJoined, setJoined] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(false);

  const { join, changeWebcam, participants, leave } = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
    onParticipantLeft: () => {
      console.log("par leave:  ", JSON.stringify(participants));
      if (participants.size < 2) {
        setParticipantLimit(false);
      }
    },
  });

  useEffect(() => {
    if (isJoined) {
      if (participants.size > 2) {
        setParticipantLimit(true);
      }
    }
  }, [isJoined]);

  useEffect(() => {
    setTimeout(() => {
      if (!isJoined) {
        join();
        if (webcamEnabled) changeWebcam();
      }
    }, 1000);

    return () => {
      leave();
      ReactNativeForegroundService.stopAll();
    };
  }, []);

  return (
    isJoined &&
    (meetingType === "GROUP" ? <CallGroupViewer /> : <OneToOneMeetingViewer />)
  );
}
