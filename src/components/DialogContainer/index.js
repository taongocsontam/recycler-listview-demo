import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Button from "../Button";

function DialogContainer(props) {
  const {
    isShowDialog,
    onCloseDialog,
    titleDialog,
    contentDialog,
    textLeft,
    textRight,
    onPressLeft,
    onPressRight,
    backgroundColor,
    data,
  } = props;

  return (
    <Modal transparent visible={isShowDialog} onRequestClose={onCloseDialog}>
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundColor || "#25252599" },
        ]}
      >
        <View style={styles.viewContentDialog}>
          <Text style={styles.textTitle}>{titleDialog}</Text>
          <Text style={styles.textContent}>{contentDialog}</Text>
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={onPressLeft}>
              <Text>{textLeft}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressRight}>
              <Text>{textRight}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DialogContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  viewContentDialog: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: 10,
    alignSelf: "center",
  },
  textTitle: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  textContent: {
    marginTop: 20,
  },
  btnView: {},
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginTop: 30,
  },
});
