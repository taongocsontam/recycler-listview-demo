import { useParticipant } from "@videosdk.live/react-native-sdk";
import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NetworkIcon } from "../../../../assets/icons";
import colors from "../../../../styles/colors";
import useParticipantStat from "../../Hooks/useParticipantStat";
import LargeVideoRTCView from "./LargeVideoRTCView";

export default LargeViewContainer = ({
  participantId,
  openStatsBottomSheet,
}) => {
  const {
    screenShareOn,
    screenShareStream,
    webcamOn,
    webcamStream,
    displayName,
    setQuality,
    isLocal,
    micOn,
  } = useParticipant(participantId, {});

  const { score } = useParticipantStat({
    participantId,
  });

  useEffect(() => {
    setQuality("high");
  }, []);

  return (
    <View style={styles.container}>
      {screenShareOn ? (
        <LargeVideoRTCView
          stream={screenShareStream}
          isOn={screenShareOn}
          displayName={displayName}
          objectFit={"contain"}
          isLocal={isLocal}
        />
      ) : (
        <>
          <LargeVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
            objectFit={"cover"}
            isLocal={isLocal}
          />
          {micOn || webcamOn ? (
            <TouchableOpacity
              style={{
                ...styles.buttonStyle,
                backgroundColor:
                  score && score > 7
                    ? "#3BA55D"
                    : score > 4
                    ? "#faa713"
                    : "#FF5D5D",
              }}
              onPress={() => {
                openStatsBottomSheet({ pId: participantId });
              }}
            >
              <NetworkIcon fill={"#fff"} />
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[800],
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonStyle: {
    alignItems: "center",
    position: "absolute",
    top: 10,
    padding: 8,
    height: 26,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    left: 10,
  },
});
