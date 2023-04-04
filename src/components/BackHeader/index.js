import { StackActions } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import IconBack from "../../assets/tabbar/iconback";
import { horizontal } from "../../scales";
// import BackIcon from "../../assets/tabbar/ic_arrow_back.svg";

const BackHeader = ({ dispatch, handleGoBack, title }) => {
  return (
    <TouchableOpacity
      style={styles.btnBack}
      onPress={() =>
        !handleGoBack ? dispatch(StackActions.pop(1)) : handleGoBack()
      }
    >
      <IconBack width={20} height={20} />
      <Text style={styles.textBack}>{title && title}</Text>
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
