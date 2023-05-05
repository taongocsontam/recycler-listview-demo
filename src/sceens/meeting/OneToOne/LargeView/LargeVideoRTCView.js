import React from "react";
import { RTCView, MediaStream } from "@videosdk.live/react-native-sdk";
import Avatar from "../../../../components/Avatar";
import colors from "../../../../styles/colors";
import { StyleSheet } from "react-native";

export default LargeVideoRTCView = ({
  stream,
  displayName,
  isOn,
  objectFit,
  isLocal = { isLocal },
}) => {
  return isOn && stream ? (
    <RTCView
      objectFit={objectFit}
      mirror={isLocal ? true : false}
      style={styles.container}
      streamURL={new MediaStream([stream.track]).toURL()}
    />
  ) : (
    <Avatar
      containerBackgroundColor={colors.primary[800]}
      fullName={displayName}
      fontSize={26}
      style={styles.avatar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#424242",
  },
  avatar: {
    backgroundColor: colors.primary[700],
    height: 70,
    aspectRatio: 1,
    borderRadius: 40,
  },
});
