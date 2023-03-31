import { StackActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { horizontal } from "../../scales";

const BackHeader = ({ dispatch, handleGoBack, title }) => {
  return (
    <TouchableOpacity
      style={styles.btnBack}
      onPress={() =>
        !handleGoBack ? dispatch(StackActions.pop(1)) : handleGoBack()
      }
    >
      <Image
        source={require("../../assets/icon/share.png")}
        style={styles.iconBack}
      />
      <Text style={styles.textBack}> Text header</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    paddingLeft: horizontal(10),
    paddingRight: horizontal(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  textBack: {
    color: "red",
    fontSize: 12,
    marginLeft: horizontal(4),
  },
  iconBack: {
    width: 20,
    height: 20,
  },
});

export default BackHeader;
