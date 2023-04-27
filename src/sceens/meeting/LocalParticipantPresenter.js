import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScreenShare } from "../../assets/icons";
import colors from "../../styles/colors";
import { ROBOTO_FONTS } from "../../styles/fonts";
import { convertRFValue } from "../../styles/spacing";

export default LocalParticipantPresenter = ({}) => {
  const { disableScreenShare } = useMeeting({});
  return (
    <View style={styles.container}>
      <View style={styles.viewCenter}>
        <ScreenShare width={40} height={40} fill={"#FFF"} />
        <Text style={styles.textTitle}>You are presenting to everyone</Text>
        <TouchableOpacity
          style={styles.btnShare}
          onPress={() => {
            disableScreenShare();
          }}
        >
          <Text style={styles.textStop}>Stop Presenting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: colors.primary[800],
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
  viewCenter: {
    alignItems: "center",
  },
  btnShare: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#5568FE",
    borderRadius: 12,
    marginVertical: 12,
  },
  textTitle: {
    fontFamily: ROBOTO_FONTS.Roboto,
    fontSize: convertRFValue(14),
    color: colors.primary[100],
    marginVertical: 12,
  },
  textStop: {
    color: colors.primary["100"],
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
});
