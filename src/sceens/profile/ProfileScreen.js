import React, { useEffect, useState } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import Constants from "../../constants";

const ProfileScreen = ({ navigation, route }) => {
  const onQRScaner = () => {
    navigation.navigate(Constants.QR_SCREEN);
  };
  return (
    <View style={styles.container}>
      <Button style={styles.btn} onPress={onQRScaner}>
        <Text style={styles.textButton}>QR Scaner</Text>
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  btn: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
  textButton: {
    color: "white",
  },
});
